import { Dispatch, SetStateAction, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { uploadContentImagesService } from "../../services/posts";

interface Props {
  previewContent: string;
  setPreviewContent: Dispatch<SetStateAction<string>>;
}
const RichTextEditor = ({ previewContent, setPreviewContent }: Props) => {
  const handleEditorChange = (content: string) => {
    setPreviewContent(content);
  };

  const saveContent = async () => {
    try {
      const base64Images = getBase64Images(previewContent);
      if (base64Images.length > 0) {
        const formData = new FormData();
        base64Images.forEach((base64Image) => {
          const dateWith_ = new Date().getTime().toString().concat("_");
          const blob = base64ToBlob(base64Image);
          formData.append("images[]", blob, `image_content_${dateWith_}.png`);
        });

        const urls = await uploadContentImagesService(formData);
        if (!urls || urls.length === 0) {
          throw new Error("No URLs returned from upload service");
        }
        addImagesToContent(urls);
      }
    } catch (error: any) {
      console.error("An error occurred:", error.message);
    }
  };

  const addImagesToContent = (urls: string[]) => {
    const regex = /src="([^"]*)"/g;
    urls.forEach((url, index) => {
      const matches = previewContent.match(regex);
      if (matches) {
        const updatedContents = previewContent.replace(
          matches[index],
          `src="${url}"`
        );
        setPreviewContent(updatedContents);
      }
    });
  };

  const getBase64Images = (content: string): string[] => {
    const regEx = /data:image\/(png|jpeg|jpg|gif);base64,([A-Za-z0-9+/=]+)/g;
    const regExForReplace =
      /<img[^>]+src="data:image\/[^;]+;base64,[^"]+"[^>]*>/g;
    const matches = content.match(regEx);

    if (!matches) {
      return [];
    } else {
      let counter = 0;
      const updatedContent = content.replace(regExForReplace, (match) => {
        return `<img src="image${counter++}" />`;
      });
      setPreviewContent(updatedContent);
      return matches;
    }
  };

  const base64ToBlob = (base64: string): Blob => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div>
      <Editor
        apiKey="j6pfchqgb617jyy0l4ftg714o1ywg4n7oleti0fc29k8hv5c"
        value={previewContent}
        initialValue="<p>Escribe aquí...</p>"
        init={{
          width: "100%",
          height: "400px",
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace code table visualblocks wordcount linkchecker',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        }}
        onEditorChange={handleEditorChange}
      />
      <button type="button" className="btn btn-dark mt-2 mb-2" onClick={saveContent}><small>Guardar imagenes</small></button>
    </div>
  );
};

export default RichTextEditor;
