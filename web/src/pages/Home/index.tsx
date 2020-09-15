import React, { useCallback, useEffect, useState } from 'react';
import {
  FiSearch,
  FiDownload,
  FiUpload,
  FiXSquare,
  FiLoader,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import fileDownload from 'js-file-download';

import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import ScrollArea from '../../components/ScrollArea';

import Input from '../../components/Input';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container,
  FileControl,
  UsageInfo,
  FilesContainer,
  Content,
  FileList,
  FileItem,
} from './styles';

interface File {
  id: string;
  user_id: string;
  name: string;
  url: string;
  original_filename: string;
  mime_type: string;
  created_at: Date;
  updated_at: Date;
}

const Home: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [activeDownloads, setActiveDownloads] = useState<string[]>([]);

  const { addToast } = useToast();
  const { signOut } = useAuth();
  const history = useHistory();

  const handleSearchSubmit = useCallback(() => {}, []);

  useEffect(() => {
    async function loadFiles() {
      try {
        const response = await api.get<File[]>('/files');

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

  const handleOpenFile = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  return (
    <Container>
      <Header hideLogo>
        <Form onSubmit={handleSearchSubmit}>
          <Input name="search" icon={FiSearch} placeholder="Pesquisar" />
        </Form>
      </Header>

      <Content>
        <FileControl>
          <ScrollArea>
            <Button background="#ddd" color="#010101">
              Novo arquivo
            </Button>

            <UsageInfo>
              <legend>Uso de armazenamento</legend>
              <span>500 MB de 2 GB usados</span>
              <div>
                <div />
              </div>
            </UsageInfo>
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
                  <FileItem
                    downloading={downloading}
                    key={file.id}
                    onDoubleClick={() => handleOpenFile(file.url)}
                  >
                    <td>{file.original_filename}</td>
                    <td>{file.updated_at}</td>
                    <td>
                      <div>
                        <button type="button" title="Atualizar">
                          <FiUpload size={20} />
                        </button>

                        <button type="button" title="Excluir">
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
