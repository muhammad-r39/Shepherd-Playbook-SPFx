import * as React from "react";
import { useEffect, useState } from "react";
import { config } from "../config";

export const DocumentLibrary: React.FC = () => {
  const [documentData, setDocumentData] = useState<any[]>([]);
  const [currentFolder, setCurrentFolder] = useState("");
  const [folderHistory, setFolderHistory] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const documentLibrary =
    config.defaultDocumentLibrary || config.defaultDocumentLibrary;
  const siteUrl = config.siteUrl;

  const fileIcons: Record<string, string> = {
    docx: "📄",
    xlsx: "📊",
    pptx: "📽",
    pdf: "📕",
    jpg: "🖼",
    png: "🖼",
    txt: "📜",
    zip: "📦",
    html: "🌐",
    aspx: "🌐",
    folder: "📁",
  };

  const getApiUrl = (folderPath = "") =>
    `${siteUrl}/_api/web/GetFolderByServerRelativeUrl('${documentLibrary}${folderPath}')/Files?$select=Name,ServerRelativeUrl,TimeLastModified,Author/Title&$expand=Author&$orderby=TimeLastModified desc`;

  const getFolderApiUrl = (folderPath = "") =>
    `${siteUrl}/_api/web/GetFolderByServerRelativeUrl('${documentLibrary}${folderPath}')/Folders?$select=Name,ServerRelativeUrl,TimeLastModified,Author/Title&$expand=Author&$orderby=TimeLastModified desc`;

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getFileIcon = (fileName: string): string => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    return fileIcons[ext] || "📄";
  };

  const fetchDocuments = async (folderPath = "", pushToHistory = true) => {
    if (pushToHistory && currentFolder !== folderPath) {
      setFolderHistory((prev) => [...prev, currentFolder]);
    }

    setCurrentFolder(folderPath);
    setCurrentPage(1);

    try {
      const [filesResponse, foldersResponse] = await Promise.all([
        fetch(getApiUrl(folderPath), {
          headers: { Accept: "application/json;odata=verbose" },
        }),
        fetch(getFolderApiUrl(folderPath), {
          headers: { Accept: "application/json;odata=verbose" },
        }),
      ]);

      const filesData = await filesResponse.json();
      const foldersData = await foldersResponse.json();

      const folders = foldersData.d.results.map((folder: any) => ({
        name: folder.Name,
        modified: formatDate(folder.TimeLastModified),
        modifiedBy: folder.Author?.Title || "Unknown",
        url: folder.ServerRelativeUrl,
        isFolder: true,
        icon: fileIcons.folder,
      }));

      const files = filesData.d.results.map((file: any) => ({
        name: file.Name,
        modified: formatDate(file.TimeLastModified),
        modifiedBy: file.Author?.Title || "Unknown",
        url: file.ServerRelativeUrl,
        isFolder: false,
        icon: getFileIcon(file.Name),
      }));

      setDocumentData([...folders, ...files]);
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  const handleFolderClick = (folderUrl: string) => {
    const relativePath = folderUrl.split(documentLibrary)[1];
    fetchDocuments(relativePath);
  };

  const handleBack = () => {
    if (folderHistory.length > 0) {
      const newHistory = [...folderHistory];
      const previousFolder = newHistory.pop()!;
      setFolderHistory(newHistory);
      fetchDocuments(previousFolder, false);
    }
  };

  useEffect(() => {
    fetchDocuments(); // initial load
  }, []);

  const paginatedItems = documentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(documentData.length / itemsPerPage);

  return (
    <div className="documents-table">
      <table>
        <thead>
          <tr>
            <th>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {folderHistory.length > 0 && (
                  <button
                    className="documents-back"
                    style={{ display: "inline-block" }}
                    onClick={handleBack}
                  >
                    🡠
                  </button>
                )}
                <img
                  style={{ marginTop: "1px" }}
                  src={require("../assets/img/icon-file.png")}
                  alt="file"
                />
              </div>
            </th>
            <th>Name</th>
            <th>Modified</th>
            <th>Modified By</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.icon}</td>
              <td>
                {item.isFolder ? (
                  <a
                    href="#"
                    data-folder={item.url}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFolderClick(item.url);
                    }}
                  >
                    {item.name}
                  </a>
                ) : (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                )}
              </td>
              <td>{item.modified}</td>
              <td>{item.modifiedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="documents-pagination">
        {totalPages > 1 && (
          <>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
