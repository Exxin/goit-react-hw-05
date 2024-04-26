import { Oval } from "react-loader-spinner";
export default function Loader({ isLoading }) {
  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    isLoading && (
      <div style={loaderStyle}>
        <Oval
          visible={true}
          height={80}
          width={80}
          // color="#4fa94d"
          color="rgb(244, 249, 94)"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )
  );
}



// import { Blocks } from "react-loader-spinner";

// export default function Loader({ isLoading }) {
//   return (
//     isLoading && (
//       <Blocks
//         height="80"
//         width="80"
//         color="#4fa94d"
//         ariaLabel="blocks-loading"
//         wrapperStyle={{}}
//         wrapperClass="blocks-wrapper"
//         visible={true}
//       />
//     )
//   );
// }
