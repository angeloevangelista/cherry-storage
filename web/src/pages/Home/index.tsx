import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  FiDownload,
  FiBookOpen,
  FiXSquare,
  FiLoader,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import fileDownload from 'js-file-download';

import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import ScrollArea from '../../components/ScrollArea';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container,
  FileControl,
  FilesContainer,
  Content,
  FileList,
  FileItem,
} from './styles';
import FileInput from '../../components/FileInput';

interface ApplicationFile {
  id: string;
  user_id: string;
  name: string;
  url: string;
  original_filename: string;
  mime_type: string;
  created_at: Date;
  updated_at: Date;
}

interface UploadFormData {
  file: File;
}

const Home: React.FC = () => {
  const uploadFormRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<ApplicationFile[]>([]);
  const [activeDownloads, setActiveDownloads] = useState<string[]>([]);

  const { addToast } = useToast();
  const { signOut } = useAuth();
  const history = useHistory();

  const handleUploadSubmit = useCallback(
    async ({ file }: UploadFormData) => {
      try {
        const formData = new FormData();

        formData.append('file', file);

        const response = await api.post('/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setFiles([...files, response.data]);

        addToast({
          type: 'success',
          tittle: 'Enviado',
          description: 'O envio foi feito com sucesso',
        });
      } catch {
        addToast({
          type: 'error',
          tittle: 'Falha ao enviar',
          description: 'Houve uma falha no envio, tente novamente',
        });
      }
    },
    [addToast, files],
  );

  useEffect(() => {
    async function loadFiles() {
      try {
        const response = await api.get<ApplicationFile[]>('/files');

        setFiles(response.data);
      } catch (err) {
        if (err.response && err.response.data.message === 'Invalid JWT token') {
          addToast({
            tittle: 'Sessão expirada',
            type: 'error',
            description: 'Sua sessão expirou, realize logon para usar',
          });

          signOut();

          history.push('/');
        }
      }
    }

    loadFiles();
  }, [addToast, history, signOut]);

  const handleDownload = useCallback(
    async (id: string, filename: string) => {
      setActiveDownloads([...activeDownloads, id]);

      const response = await api.get(`/storage/${id}`, {
        responseType: 'blob',
      });

      fileDownload(response.data, filename);

      setActiveDownloads(activeDownloads.filter((fileId) => fileId !== id));
    },
    [activeDownloads],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/files/${id}`);

        setFiles([...files.filter((file) => file.id !== id)]);

        addToast({
          type: 'success',
          tittle: 'Excluído',
          description: 'O arquivo foi excluído com sucesso',
        });
      } catch {
        addToast({
          type: 'error',
          tittle: 'Falha ao excluir',
          description: 'Houve uma falha ao excluir o arquivo, tente novamente',
        });
      }
    },
    [addToast, files],
  );

  const handleOpenFile = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  return (
    <Container>
      <Header hideLogo>
        {/* <Form onSubmit={handleSearchSubmit}>
          <Input name="search" icon={FiSearch} placeholder="Pesquisar" />
        </Form> */}
      </Header>

      <Content>
        <FileControl>
          <ScrollArea>
            <Form onSubmit={handleUploadSubmit}>
              <FileInput name="file" ref={uploadFormRef} />
              <Button type="submit">Enviar</Button>
            </Form>

            {/* <UsageInfo>
              <legend>Uso de armazenamento</legend>
              <span>500 MB de 2 GB usados</span>
              <div>
                <div />
              </div>
            </UsageInfo> */}
          </ScrollArea>
        </FileControl>

        <FilesContainer>
          <h1>Arquivos</h1>

          <FileList>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Última modificação</th>
                <th>Acões</th>
              </tr>
            </thead>

            <tbody>
              {files.map((file) => {
                const downloading = activeDownloads.includes(file.id);

                return (
                  <FileItem downloading={downloading} key={file.id}>
                    <td>{file.original_filename}</td>
                    <td>{file.updated_at}</td>
                    <td>
                      <div>
                        <button
                          type="button"
                          title="Atualizar"
                          onClick={() => handleOpenFile(file.url)}
                        >
                          <FiBookOpen size={20} />
                        </button>

                        <button
                          type="button"
                          title="Excluir"
                          onClick={() => handleDelete(file.id)}
                        >
                          <FiXSquare size={20} />
                        </button>

                        <button
                          type="button"
                          title="Baixar"
                          disabled={downloading}
                          onClick={() => handleDownload(file.id, file.original_filename)}
                        >
                          {downloading ? (
                            <FiLoader size={20} />
                          ) : (
                            <FiDownload size={20} />
                          )}
                        </button>
                      </div>
                    </td>
                  </FileItem>
                );
              })}
            </tbody>
          </FileList>
        </FilesContainer>
      </Content>
    </Container>
  );
};

export default Home;
