// Be careful: even a folder is a file!
export type FileType = {
  ID: string; // Unique ID given to this file
  Name: string;
  IsDir: boolean;
  Path?: string; // Optional because files inherit the path from the parentId folder
  ModTime?: Date;
  Size?: number;
  MimeType?: string;
};

export type FileSystemType = FileType[];
