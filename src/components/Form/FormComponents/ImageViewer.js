/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import defaultImage from "../../../assets/images/galry.png"; // Replace with the actual path to your default image
import "./ImageViewer.css"; // Import your CSS file for styling

const ImageViewer = ({ files, onRemoveFile }) => {
  // Check if 'files' is an array
  if (!Array.isArray(files)) {
    // Handle the case when 'files' is not an array (e.g., single file)
    files = [files];
  }

  return (
    <div className="image-viewer-container">
      {files.map((file, index) => (
        <div key={index} className="image-item">
          <img
            src={file instanceof Blob ? URL.createObjectURL(file) : defaultImage}
            alt={`Selected Image ${index + 1}`}
            className="img-thumbnail"
          />
          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => onRemoveFile(index)}
          >
            Remove
          </button>
        </div>
      ))}
      {files.length === 0 && (
        <div className="image-item">
          <img
            src={defaultImage}
            alt="Default Image"
            className="img-thumbnail"
          />
        </div>
      )}
    </div>
  );
};

export default ImageViewer;


// /* eslint-disable jsx-a11y/img-redundant-alt */
// import React from "react";
// import defaultImage from "../../../assets/images/maintenance-bg.png"; // Replace with the actual path to your default image
// import "./ImageViewer.css"; // Import your CSS file for styling

// const ImageViewer = ({ files, onRemoveFile }) => { 
//   // Check if 'files' is an array
//   if (!Array.isArray(files)) {
//     // Handle the case when 'files' is not an array (e.g., single file)
//     files = [files];
//   }

//   return (
//     <div className="image-viewer-container">
//       {files.map((file, index) => (
//         <div key={index} className="image-item">
//           <img
//             src={URL.createObjectURL(file)}
//             alt={`Selected Image ${index + 1}`}
//             className="img-thumbnail"
//           />
//           <button
//             type="button"
//             className="btn btn-danger mt-2"
//             onClick={() => onRemoveFile(index)}
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//       {files.length === 0 && (
//         <div className="image-item">
//           <img
//             src={defaultImage}
//             alt="Default Image"
//             className="img-thumbnail"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageViewer;





// /* eslint-disable jsx-a11y/img-redundant-alt */
// import React from "react";
// import defaultImage from "../../../assets/images/maintenance-bg.png"; // Replace with the actual path to your default image

// const ImageViewer = ({ files, onRemoveFile }) => {
//   return (
//     <div>
//       {files.map((file, index) => (
//         <div key={index} className="mb-3">
//           <img
//             src={URL.createObjectURL(file)}
//             alt={`Selected Image ${index + 1}`}
//             className="img-fluid"
//           />
//           <button
//             type="button"
//             className="btn btn-danger mt-2"
//             onClick={() => onRemoveFile(index)}
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//       {files.length === 0 && (
//         <div className="mb-3">
//           <img
//             src={defaultImage}
//             alt="Default Image"
//             style={{ width: "100%", height: "200px", backgroundColor: "#eee" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageViewer;


/* eslint-disable jsx-a11y/img-redundant-alt */
// ImageViewer.jsx

// import React from "react";
// import defaultAvatar from "../../../assets/images/maintenance-bg.png"; // Replace with the actual path to your default avatar image

// const ImageViewer = ({ file }) => {
//   if (!file) {
//     return (
//       <div className="mb-3">
//         <div
//           style={{
//             width: "100%",
//             height: "200px", // Set your desired height for the dummy box
//             backgroundColor: "#eee", // Set your desired background color
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <img
//             src={defaultAvatar}
//             alt="Default Avatar"
//             style={{ maxWidth: "100%", maxHeight: "100%" }}
//           />
//         </div>
//       </div>
//     );
//   }

//   const imageUrl = URL.createObjectURL(file);

//   return (
//     <div className="mb-3">
//       <img src={imageUrl} alt="Selected Image" className="img-fluid" />
//     </div>
//   );
// };

// export default ImageViewer;
