export default function getImageMeta(uri, isDocument) {
  const name = uri.substr(uri.lastIndexOf('/') + 1);
  const ext = name.substr(name.lastIndexOf('.') + 1);

  const formattedUri = uri.replace(/%40/g, '%2540');
  const documentUri = 'file://' + formattedUri.replace(/%2F/g, '%252F');

  let type = '';
  switch (ext) {
      case 'jpeg':
          type = 'image/jpeg';
          break;

      case 'jpg':
          type = 'image/jpg';
          break;
      case 'png':
          type = 'image/png';
          break;
      case 'doc':
          type = 'application/msword';
          break;
      case 'docx':
          type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
      case 'xls':
          type = 'application/vnd.ms-excel';
          break;
      case 'xlsx':
          type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;
      case 'pdf':
          type = 'application/pdf';
          break;
      default:
          type = '';
          break;
  }

  return {
      uri: isDocument ? documentUri : uri,
      name,
      type,
  };
}
