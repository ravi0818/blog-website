import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { API_BASE_URL } from "../utils/Constants";

const TinyMCE = React.forwardRef((props, ref) => {
  const editorRef = ref;

  return (
    <>
      <Editor
        apiKey="your-api-key"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={props.state ? props.state : ""}
        init={{
          height: 500,
          menubar: false,
          toolbar_mode: "wrap",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "image | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

          file_picker_types: "image",
          /* and here's our custom image picker*/
          file_picker_callback: (cb, value, meta) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.addEventListener("change", async (e) => {
              const file = e.target.files[0];
              const formData = new FormData();

              formData.append("image", file);

              const res = await axios.post(`${API_BASE_URL}/images`, formData, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });

              console.log(res);

              cb(String(res.data), { title: "file.name " });

              //   const reader = new FileReader();
              //       reader.addEventListener("load", () => {
              //         /*
              //   Note: Now we need to register the blob in TinyMCEs image blob
              //   registry. In the next release this part hopefully won't be
              //   necessary, as we are looking to handle it internally.
              // */
              //         const id = "blobid" + new Date().getTime();
              //         const blobCache = tinymce.activeEditor.editorUpload.blobCache;
              //         const base64 = reader.result.split(",")[1];
              //         const blobInfo = blobCache.create(id, file, base64);
              //         blobCache.add(blobInfo);

              //         /* call the callback and populate the Title field with the file name */
              //         cb(blobInfo.blobUri(), { title: file.name });
              //       });
              //       reader.readAsDataURL(file);
            });

            input.click();
          },
        }}
      />
    </>
  );
});

export default TinyMCE;
