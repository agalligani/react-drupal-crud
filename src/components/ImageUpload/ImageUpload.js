import React, { Component } from "react";
import Spinner from "./Spinner";
import Images from "./Images";
import Buttons from "./Buttons";
import { connect } from "react-redux";
import { API_URL } from "../../config";

class ImageUpload extends Component {
  state = {
    uploading: false,
    images: [],
  };

  onChange = async (e) => {
    const files = Array.from(e.target.files);
    console.log(e.target.files);
    this.setState({ uploading: true });

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    formData.forEach(async (f) => {
      const { basic_auth_token, session } = this.props.state.user;
      const headers = {
        "Content-type": "application/hal+json",
        "Content-Disposition": "file; filename='filename.jpg'",
        Authorization: `Basic ${basic_auth_token}`,
        "X-CSRF-Token": session,
      };

      try {
        console.log(headers);

        const body = JSON.stringify({
          _links: {
            type: {
              href: `${API_URL}/rest/type/file/image`,
            },
          },
          filename: [
            {
              value: f.name,
            },
          ],
          filemime: [
            {
              value: "image/png",
            },
          ],
          data: [
            {
              value: f,
            },
          ],
        });

        const res = await fetch(`${API_URL}/entity/file?_format=hal_json`, {
          method: "POST",
          headers: headers,
          body: body,
        });
        let images = await res.json();
        this.setState({ uploading: false, images });
      } catch (error) {
        console.log("error:", error);
      }
    });

    // fetch(`${API_URL}/entity/file`, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((images) => {
    //     this.setState({
    //       uploading: false,
    //       images,
    //     });
    //   });
  };

  removeImage = (id) => {
    this.setState({
      images: this.state.images.filter((image) => image.public_id !== id),
    });
  };

  render() {
    const { uploading, images } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />;
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} />;
        default:
          return <Buttons onChange={this.onChange} />;
      }
    };

    return (
      <div>
        <div className="buttons">{content()}</div>
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
