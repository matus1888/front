import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Post } from "../../api/postsApi";

export const CreatePostModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [formData, setFormData] = useState<Partial<Post>>({});
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState([]);

  const handleEdit = async () => {
    setIsOpen(false);
  };

  const removeImage = (index: number) => {
    //relase me
  };

  const handleFileChange = () => {
    //release me
  };

  const onClose = () => {
    setIsOpen(false);
  };
  // Обработка перетаскивания файлов
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newImages = Array.from(e.dataTransfer.files).map(
        (item) => item.name,
      );
      setFormData((prev) => ({
        ...prev,
        images: [...(prev?.images || []), ...newImages],
      })); // Добавляем новые файлы
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Box
          justifyContent="space-between"
          flexDirection="row"
          display="flex"
          gap="10px"
        >
          <Box>Отредактируйте данные и нажмите сохранить</Box>
          <Box sx={{ cursor: "pointer" }} alignItems="center" display="flex">
            <Close onClick={onClose} />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Paper>
          <Stack padding="16px" display="flex" gap="16px">
            <TextField
              value={formData.title}
              label="Отображаемый заголовок"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <TextareaAutosize
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </Stack>
          <div>
            <p>Добавьте изображения:</p>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                border: dragActive ? "2px dashed green" : "2px dashed gray",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <p>Перетащите файлы сюда или</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer text-blue-500"
              >
                выберите файлы
              </label>
            </div>

            {/* Предпросмотр изображений */}
            <div className="mt-4 flex gap-2 flex-wrap">
              {[...images.map((file) => URL.createObjectURL(file))].map(
                (image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`preview-${index}`}
                      className="w-24 h-24 object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ),
              )}
            </div>
          </div>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" paddingX="16px">
          <Button variant="contained" onClick={handleEdit}>
            Сохранить
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
