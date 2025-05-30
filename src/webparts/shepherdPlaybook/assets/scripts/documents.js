document.addEventListener("DOMContentLoaded", function () {
  const documentContainer = document.querySelector(".documents-table tbody");
  const paginationContainer = document.querySelector(".documents-pagination");
  const documentsTableHead = document.querySelector(
    ".documents-table thead tr"
  );

  const documentLibrary =
    window.documentLibrary || window.defaultDocumentLibrary;
  const siteUrl = window.siteUrl;
  let currentFolder = "";
  let folderHistory = [];

  const itemsPerPage = 10;
  let currentPage = 1;
  let documentData = [];

  const fileIcons = {
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

  // Create Back Button inside the first <th>
  const backButton = document.createElement("button");
  backButton.innerText = "🡠";
  backButton.classList.add("documents-back");
  backButton.addEventListener("click", function () {
    if (folderHistory.length > 0) {
      currentFolder = folderHistory.pop(); // Move back to last folder
      fetchDocuments(currentFolder, false); // Don't push to history again
    }
  });

  // Insert the back button inside the first <th>
  const firstTH = documentsTableHead.querySelector("th:first-child");
  if (firstTH) {
    firstTH.prepend(backButton);
  }

  function getApiUrl(folderPath = "") {
    return `${siteUrl}/_api/web/GetFolderByServerRelativeUrl('${documentLibrary}${folderPath}')/Files?$select=Name,ServerRelativeUrl,TimeLastModified,Author/Title&$expand=Author&$orderby=TimeLastModified desc`;
  }

  function getFolderApiUrl(folderPath = "") {
    return `${siteUrl}/_api/web/GetFolderByServerRelativeUrl('${documentLibrary}${folderPath}')/Folders?$select=Name,ServerRelativeUrl,TimeLastModified,Author/Title&$expand=Author&$orderby=TimeLastModified desc`;
  }

  async function fetchDocuments(folderPath = "", pushToHistory = true) {
    if (pushToHistory && currentFolder !== folderPath) {
      folderHistory.push(currentFolder); // Push only when actually navigating
    }

    currentFolder = folderPath;
    documentData = [];

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

      documentData = foldersData.d.results.map((folder) => ({
        name: folder.Name,
        modified: formatDate(folder.TimeLastModified),
        modifiedBy: folder.Author ? folder.Author.Title : "Unknown",
        url: folder.ServerRelativeUrl,
        isFolder: true,
        icon: fileIcons.folder,
      }));

      documentData = documentData.concat(
        filesData.d.results.map((file) => ({
          name: file.Name,
          modified: formatDate(file.TimeLastModified),
          modifiedBy: file.Author ? file.Author.Title : "Unknown",
          url: file.ServerRelativeUrl,
          isFolder: false,
          icon: getFileIcon(file.Name),
        }))
      );

      renderDocuments();
    } catch (error) {
      console.error("Error fetching documents:", error);
    }

    // Show or Hide Back Button based on Folder Depth
    backButton.style.display =
      folderHistory.length > 0 ? "inline-block" : "none";
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getFileIcon(fileName) {
    const ext = fileName.split(".").pop().toLowerCase();
    return fileIcons[ext] || "📄";
  }

  function renderDocuments() {
    documentContainer.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedItems = documentData.slice(start, start + itemsPerPage);

    paginatedItems.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.icon}</td>
        <td>
          <a href="${item.isFolder ? "#" : item.url}" 
             ${item.isFolder ? `data-folder="${item.url}"` : `target="_blank"`}>
            ${item.name}
          </a>
        </td>
        <td>${item.modified}</td>
        <td>${item.modifiedBy}</td>
      `;

      if (item.isFolder) {
        row.querySelector("a").addEventListener("click", function (event) {
          event.preventDefault();
          fetchDocuments(item.url.split(documentLibrary)[1]); // Navigate inside folder
        });
      }

      documentContainer.appendChild(row);
    });

    updatePagination();
  }

  function updatePagination() {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(documentData.length / itemsPerPage);

    if (totalPages > 1) {
      const prevButton = document.createElement("button");
      prevButton.innerText = "<";
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderDocuments();
        }
      });
      paginationContainer.appendChild(prevButton);

      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        if (i === currentPage) pageButton.classList.add("active");
        pageButton.addEventListener("click", () => {
          currentPage = i;
          renderDocuments();
        });
        paginationContainer.appendChild(pageButton);
      }

      const nextButton = document.createElement("button");
      nextButton.innerText = ">";
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderDocuments();
        }
      });
      paginationContainer.appendChild(nextButton);
    }
  }

  fetchDocuments(); // Load root folder initially
});
