export const generateUID = (): string => {
  let firstPart: number | string = (Math.random() * 46656) | 0;
  let secondPart: number | string = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

export const getFileBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          // Remove "data:*/*;base64," prefix from the result
          // const base64String = reader.result.toString().split(",")[1];
          resolve(reader.result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };

      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};
