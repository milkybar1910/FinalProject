import React from "react";
import Base from "../../Base";
import { Editor } from "react-draft-wysiwyg";
// import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Container } from "react-bootstrap";
import "./Editor.css";
import Bold from "../../assets/bold.svg";
import { FaBold } from "react-icons/fa";
import "./Editor.js";
const EditorPage = () => {
  const editorLabels = {
    // BlockType
    "components.controls.blocktype.h1": "Heading 1",
    "components.controls.blocktype.h2": "Heading 2",
    "components.controls.blocktype.h3": "Heading 3",
    "components.controls.blocktype.h4": "Heading 4",
    "components.controls.blocktype.h5": "Heading 5",
    "components.controls.blocktype.h6": "Heading 6",
    "components.controls.blocktype.blockquote": "Blockquote",
    "components.controls.blocktype.code": "Code",
    "components.controls.blocktype.blocktype": "Block Type",
    "components.controls.blocktype.normal": "Regular Text",

    // FontSize
    "components.controls.fontsize.fontsize": "Font Size",

    // Image
    "components.controls.image.image": "Image",
    "components.controls.image.fileUpload": "File Upload",
    "components.controls.image.byURL": "URL",
    "components.controls.image.dropFileText":
      "Drop the file or click to upload",

    // Inline
    "components.controls.inline.bold": "Bold",
    "components.controls.inline.italic": "Italic",
    "components.controls.inline.underline": "Underline",
    "components.controls.inline.strikethrough": "Strikethrough",
    "components.controls.inline.monospace": "Monospace",
    "components.controls.inline.superscript": "Superscript",
    "components.controls.inline.subscript": "Subscript",

    // Link
    "components.controls.link.linkTitle": "Link Title",
    "components.controls.link.linkTarget": "Link Target",
    "components.controls.link.linkTargetOption": "Open link in new window",
    "components.controls.link.link": "Link",
    "components.controls.link.unlink": "Unlink",

    // List
    "components.controls.list.list": "List",
    "components.controls.list.unordered": "Unordered",
    "components.controls.list.ordered": "Ordered",
    "components.controls.list.indent": "Indent",
    "components.controls.list.outdent": "Outdent",

    // TextAlign
    "components.controls.textalign.textalign": "Text Align",
    "components.controls.textalign.left": "Left",
    "components.controls.textalign.center": "Center",
    "components.controls.textalign.right": "Right",
    "components.controls.textalign.justify": "Justify",
  };
  return (
    <Container>
      <Editor
        localization={{ locale: "en", translations: editorLabels }}
        toolbarClassName=""
        editorClassName="border border-primary border-2 poppins-font"
        toolbar={{
          options: ["blockType", "inline", "list", "link", "textAlign"],
          blockType: {
            options: [
              "Normal",
              "H1",
              "H2",
              "H3",
              "H4",
              "H5",
              "H6",
              "blockquote",
            ],
          },
          inline: {
            options: ["bold", "italic", "underline"],
          },

          list: {
            options: ["unordered", "ordered"],
          },
          textAlign: {
            inDropdown: true,
            options: ["left", "center", "right", "justify"],
          },

          link: {
            defaultTargetOption: "_self",
            options: ["link", "unlink"],
          },

          image: {
            // icon: image,
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: undefined,
            previewImage: false,
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: "auto",
              width: "auto",
            },
          },
        }}
      />
    </Container>
  );
};

export default EditorPage;
