import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';
import { Alert } from 'reactstrap';
import { NotificationManager } from '../common/react-notifications';

const ReactDOMServer = require('react-dom/server');

const dropzoneConfig = token => ({
  thumbnailHeight: 160,
  addRemoveLinks: true,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              <i />{' '}
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container">
            {/*  eslint-disable-next-line jsx-a11y/alt-text */}
            <img data-dz-thumbnail className="img-thumbnail border-0" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            {' '}
            <span data-dz-name />{' '}
          </div>
          <div className="text-primary text-extra-small" data-dz-size />
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
    </div>
  ),
  dictDefaultMessage: 'Arraste fotos para cá!',
  dictResponseError: 'Erro ao enviar imagem',
  dictCancelUpload: 'Cancelar upload',
  dictUploadCanceled: 'Upload cancelado',
  dictRemoveFile: 'Remover arquivo',
  dictMaxFilesExceeded: 'Você atingiu o máximo de arquivos',
  dictFileTooBig:
    'Arquivo muito grande ({{filesize}}MiB). Tamanho máximo: {{maxFilesize}}MiB.',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  uploadMultiple: true,
  paramName: 'photos',
  parallelUploads: 1,
  maxFiles: 10,
});

function DropZone({ handleFiles, error }) {
  let img = [];
  const token = window.sessionStorage.getItem('@access_token');

  return (
    <div>
      {error && <Alert>Você precisa enviar ao menos 1 imagem.</Alert>}
      <DropzoneComponent
        config={{
          postUrl: `${process.env.REACT_APP_API_URL}/announcements/photos`,
        }}
        eventHandlers={{
          success: (event, file) => {
            img = [...img, { name: event.name, file: file[0] }];
            handleFiles(img);
          },
          removedfile: event => {
            img = [...img.filter(e => e.name !== event.name)];
            handleFiles(img);
          },
        }}
        djsConfig={dropzoneConfig(token)}
      />
    </div>
  );
}

export default DropZone;
