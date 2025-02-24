import React from "react";

interface ISvgIconProps extends React.AllHTMLAttributes<HTMLDivElement> {
  svgType: "file" | "upload" | "folder" | "add-folder" | "arrow-up" | "arrow-down" | "close" | "list" | "icons";
}

const SvgIcon: React.FC<ISvgIconProps> = ({
  svgType,
  ...props
}: ISvgIconProps) => {
  const svgContent = () => {
    switch (svgType) {
      case "file": {
        return (
          <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            enableBackground="new 0 0 48 48"
          >
            <polygon fill="#90CAF9" points="40,45 8,45 8,3 30,3 40,13" />
            <polygon fill="#E1F5FE" points="38.5,14 29,14 29,4.5" />
          </svg>
        );
      }
      case "upload": {
        return (
          <svg
            viewBox="0 0 22 22"
            enableBackground="new 0 0 22 22"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7498 11.6251V14.7501H2.24984V11.6251H0.166504V14.7501C0.166504 15.8959 1.104 16.8334 2.24984 16.8334H14.7498C15.8957 16.8334 16.8332 15.8959 16.8332 14.7501V11.6251H14.7498ZM3.2915 5.37508L4.76025 6.84383L7.45817 4.15633V12.6667H9.5415V4.15633L12.2394 6.84383L13.7082 5.37508L8.49984 0.166748L3.2915 5.37508Z" />
          </svg>

        );
      }
      case "folder": {
        return (
          <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            enableBackground="new 0 0 48 48"
          >
            <path
              fill="#FFA000"
              d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"
            />
            <path
              fill="#FFCA28"
              d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"
            />
          </svg>
          
        );
      }

      case "add-folder": {
        return (
          <svg
            viewBox="0 0 22 22"
            enableBackground="new 0 0 22 22"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M18.8335 2.25008H10.5002L8.41683 0.166748H2.16683C1.01058 0.166748 0.0939128 1.09383 0.0939128 2.25008L0.0834961 14.7501C0.0834961 15.9063 1.01058 16.8334 2.16683 16.8334H18.8335C19.9897 16.8334 20.9168 15.9063 20.9168 14.7501V4.33341C20.9168 3.17716 19.9897 2.25008 18.8335 2.25008ZM18.8335 14.7501H2.16683V2.25008H7.55225L9.63558 4.33341H18.8335V14.7501ZM10.5002 10.5834H12.5835V12.6667H14.6668V10.5834H16.7502V8.50008H14.6668V6.41675H12.5835V8.50008H10.5002V10.5834Z" />
          </svg>

        );
      }
      case "arrow-up": {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 1024 1024">
            <path d="M868 545.5L536.1 163a31.96 31.96 0 0 0-48.3 0L156 545.5a7.97 7.97 0 0 0 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" />
          </svg>
        );
      }
      case "arrow-down": {
        return (
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z">
            </path>
          </svg>
        )
      }
      case "close": {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
          </svg>
        );
      }
      case "list": {
        return (
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z">
            </path>
          </svg>
        )
      }
      case "icons": {
        return (
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M72,60A12,12,0,1,1,60,48,12,12,0,0,1,72,60Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,128,48Zm68,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,184a12,12,0,1,0,12,12A12,12,0,0,0,60,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,184Z">
            </path>
          </svg>
        )
      }
      default: {
        return "";
      }
    }
  };

  return <div {...props}>{svgContent()}</div>;
};

export default SvgIcon;
