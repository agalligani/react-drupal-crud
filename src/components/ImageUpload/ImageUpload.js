import React, { Component } from "react";
import Spinner from "./Spinner";
import Images from "./Images";
import Buttons from "./Buttons";
import { connect } from "react-redux";
import { stageImage, uploadImage } from "../../_actions/mediaActions";
import { API_URL } from "../../config";

class ImageUpload extends Component {
  state = {
    selectedFile: null,
  };

  fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({ selectedFile: event.target.files[0] });
  };

  fileUploadHandler = async () => {
    //Use HAL+JSON to upload an image file using REST API
    let file = this.state.selectedFile;
    const reader = new FileReader();
    reader.onload = async () => {
      let arrayBuffer = await reader.result;
      let base64String = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const { basic_auth_token, session } = this.props.state.user;
      const headers = {
        "Content-type": "application/hal+json",
        Authorization: `Basic ${basic_auth_token}`,
        "X-CSRF-Token": session,
        "Content-Disposition": "file; filename='filename.jpg'",
      };
      const body = await JSON.stringify({
        _links: {
          type: {
            href: `${API_URL}/rest/type/file/image`,
          },
        },
        filename: [
          {
            value: this.state.selectedFile.name,
          },
        ],
        filemime: [
          {
            value: "image/jpeg",
          },
        ],
        uri: [{ value: `public://${this.state.selectedFile.name}` }],
        data: [
          {
            value: base64String,
          },
        ],
      });
      try {
        const res = await fetch(`${API_URL}/entity/file?_format=hal_json`, {
          method: "POST",
          headers: headers,
          body: body,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  render() {
    return (
      <div className="image-upload">
        <input type="file" onChange={this.fileSelectedHandler} />
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(ImageUpload);

// import React, { Component } from "react";
// import Spinner from "./Spinner";
// import Images from "./Images";
// import Buttons from "./Buttons";
// import { connect } from "react-redux";
// import { stageImage, uploadImage } from "../../_actions/mediaActions";
// import { API_URL } from "../../config";

// class ImageUpload extends Component {
//   state = {
//     uploading: false,
//     stagedImage: null,
//     images: [],
//     secure_url: null,
//   };

//   previewFile = (e) => {
//     let { images } = this.state;
//     let file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = async () => {
//       let result = await reader.result;
//       this.setState({ secure_url: result });
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   onChange = (e) => {
//     let { images } = this.state;
//     let files = e.target.files[0];
//     console.log(files);
//     let reader = new FileReader();
//     reader.onload = (e) => {
//       reader.readAsText(e);
//     };
//     images.append(e.target.result);
//     this.setState({ images: images });
//   };

//   onSubmit = async (e) => {
//     const files = Array.from(e.target.files);
//     console.log(e.target.files);
//     this.setState({ uploading: true });

//     const formData = new FormData();

//     files.forEach((file, i) => {
//       formData.append(i, file);
//     });

//     formData.forEach(async (f) => {
//       const { basic_auth_token, session } = this.props.state.user;
//       const headers = {
//         "Content-type": "application/hal+json",
//         "Content-Disposition": "file; filename='filename.jpg'",
//         Authorization: `Basic ${basic_auth_token}`,
//         "X-CSRF-Token": session,
//       };

//       try {
//         console.log(headers);

//         const body = JSON.stringify({
//           _links: {
//             type: {
//               href: `${API_URL}/rest/type/file/image`,
//             },
//           },
//           filename: [
//             {
//               value: f.name,
//             },
//           ],
//           filemime: [
//             {
//               value: "image/png",
//             },
//           ],
//           data: [
//             {
//               value: f,
//             },
//           ],
//         });

//         const res = await fetch(`${API_URL}/entity/file?_format=hal_json`, {
//           method: "POST",
//           headers: headers,
//           body: body,
//         });
//         let images = await res.json();
//         this.setState({ uploading: false, images });
//       } catch (error) {
//         console.log("error:", error);
//       }
//     });
//   };

//   removeImage = (id) => {
//     this.setState({
//       images: this.state.images.filter((image) => image.public_id !== id),
//     });
//   };

//   render() {
//     const { uploading, secure_url } = this.state;

//     const content = () => {
//       switch (true) {
//         case uploading:
//           return <Spinner />;
//         case secure_url !== null:
//           return (
//             <img alt="hi" src={secure_url} style={{ maxWidth: 250 }}></img>
//           );
//         default:
//           return <Buttons onChange={this.previewFile} />;
//       }
//     };

//     return (
//       <div>
//         <div className="buttons">{content()}</div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     state: state,
//   };
// };

// export default connect(mapStateToProps)(ImageUpload);
