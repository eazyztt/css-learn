import { useRef } from "react";

export default function UploadForm({ files, setFiles }) {
  const inputRef = useRef(null); // 👈 ref для input

  const onChange = (e) => {
    const newFiles = Array.from(e.target.files);

    const fileNames = new Set(files.map((file) => file.name));
    const uniqueNewFiles = newFiles.filter((file) => !fileNames.has(file.name));

    setFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
  };

  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, i) => i !== indexToRemove);
    setFiles(updatedFiles);

    // 🧼 Очистим <input type="file">, если список стал пуст
    if (updatedFiles.length === 0 && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="flex flex-col mt-20 pl-4 pt-5">
        <p className="pt-10 text-gray-300">
          Drag all your screenshots from any app and click
          <span className="font-bold text-white"> submit</span>
        </p>
        <p className="pt-2 text-gray-300">
          Our app will analyze it and return you the best way to start
          <span className="font-bold text-white"> conversation</span>
        </p>
      </div>

      <div className="flex items-center justify-center w-full pt-6 ">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.2 5a4 4 0 0 0 0 8h2.2M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            ref={inputRef}
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={onChange}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 px-4">
          <p className="text-sm text-white font-semibold mb-2">
            Selected files:
          </p>
          <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md"
              >
                <span className="truncate">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-3 font-bold text-2xl"
                >
                  ✖️
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
