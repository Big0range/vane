---
name: n-upload
description: A comprehensive file upload component supporting drag-and-drop, multiple files, custom requests, thumbnails, and progress tracking
author: jiaiyan
version: 1.0.0
---

# n-upload Component

The `n-upload` component provides a complete solution for file uploads in web applications. It supports various upload methods including click-to-upload, drag-and-drop, directory upload, and offers extensive customization options for request handling, file preview, and progress tracking.

## When to Use

Use `n-upload` when you need to:

- **File Uploads**: Allow users to upload files to your server
- **Drag and Drop**: Support drag-and-drop file uploads
- **Multiple Files**: Handle multiple file uploads simultaneously
- **Image Uploads**: Upload and preview images with thumbnail support
- **Custom Requests**: Implement custom upload logic (e.g., direct cloud uploads)
- **Progress Tracking**: Show upload progress to users
- **Directory Upload**: Upload entire directories

## Basic Usage

### Basic Upload

```vue
<template>
  <n-upload
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :headers="{
      'naive-info': 'hello!',
    }"
    :data="{
      'naive-data': 'cool! naive!',
    }"
  >
    <n-button>Upload File</n-button>
  </n-upload>
</template>
```

### Drag and Drop Upload

```vue
<template>
  <n-upload
    multiple
    directory-dnd
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :max="5"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <ArchiveIcon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        Click or drag a file to this area to upload
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        Strictly prohibit from uploading sensitive information.
      </n-p>
    </n-upload-dragger>
  </n-upload>
</template>
```

### Manual Submit

```vue
<template>
  <n-button
    :disabled="!fileListLength"
    style="margin-bottom: 12px"
    @click="handleClick"
  >
    Upload File
  </n-button>
  <n-upload
    ref="uploadRef"
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-upload="false"
    multiple
    @change="handleChange"
  >
    <n-button>Select File</n-button>
  </n-upload>
</template>

<script setup>
import { ref } from 'vue';

const uploadRef = ref(null);
const fileListLength = ref(0);

const handleClick = () => {
  uploadRef.value?.submit();
};

const handleChange = ({ fileList }) => {
  fileListLength.value = fileList.length;
};
</script>
```

### Controlled File List

```vue
<template>
  <n-upload
    v-model:file-list="fileList"
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    @update:file-list="handleFileListChange"
    @change="handleUploadChange"
    @remove="handleRemove"
  >
    <n-button>Upload File</n-button>
  </n-upload>
</template>

<script setup>
import { ref } from 'vue';

const fileList = ref([]);

const handleFileListChange = list => {
  console.log('File list changed:', list);
};

const handleUploadChange = ({ file, fileList }) => {
  console.log('Upload change:', file);
};

const handleRemove = ({ file, fileList }) => {
  return true;
};
</script>
```

### Image Card Upload

```vue
<template>
  <n-upload
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image-card"
  >
    Click to Upload
  </n-upload>
</template>

<script setup>
const fileList = [
  {
    id: '1',
    name: 'image.png',
    status: 'finished',
    url: 'https://example.com/image.png',
  },
];
</script>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `accept` | `string` | `undefined` | Accepted file types (HTML accept attribute). |
| `action` | `string` | `undefined` | Upload URL. |
| `data` | `Object \| ({ file: UploadFileInfo }) => Object` | `undefined` | Additional form data. |
| `headers` | `Object \| ({ file: UploadFileInfo }) => Object` | `undefined` | Additional HTTP headers. |
| `method` | `string` | `'POST'` | HTTP request method. |
| `name` | `string` | `'file'` | Field name in form data. |
| `multiple` | `boolean` | `false` | Allow multiple file selection. |
| `directory` | `boolean` | `false` | Allow directory upload. |
| `directory-dnd` | `boolean` | `false` | Allow directory drag and drop. |
| `disabled` | `boolean` | `false` | Disable the upload. |
| `max` | `number` | `undefined` | Maximum number of files. |
| `file-list` / `v-model:file-list` | `Array<UploadFileInfo>` | `undefined` | Controlled file list. |
| `default-file-list` | `Array<UploadFileInfo>` | `[]` | Default uncontrolled file list. |
| `default-upload` | `boolean` | `true` | Upload immediately after file selection. |
| `list-type` | `'text' \| 'image' \| 'image-card'` | `'text'` | File list display style. |
| `show-file-list` | `boolean` | `true` | Show file list. |
| `show-trigger` | `boolean` | `true` | Show upload trigger. |
| `show-cancel-button` | `boolean` | `true` | Show cancel button during upload. |
| `show-remove-button` | `boolean` | `true` | Show remove button. |
| `show-download-button` | `boolean` | `false` | Show download button. |
| `show-preview-button` | `boolean` | `true` | Show preview button (image-card mode). |
| `show-retry-button` | `boolean` | `true` | Show retry button for failed uploads. |
| `abstract` | `boolean` | `false` | Remove DOM wrapper (for custom layouts). |
| `with-credentials` | `boolean` | `false` | Send cookies with requests. |
| `response-type` | `'' \| 'arraybuffer' \| 'blob' \| 'document' \| 'json' \| 'text'` | `''` | XMLHttpRequest response type. |
| `custom-request` | `(options: UploadCustomRequestOptions) => void` | `undefined` | Custom upload request handler. |
| `custom-download` | `(file: FileInfo) => void` | `undefined` | Custom download handler. |
| `create-thumbnail-url` | `(file: File \| null, fileInfo: UploadSettledFileInfo) => (Promise<string> \| string \| undefined)` | `undefined` | Custom thumbnail generator. |
| `should-use-thumbnail-url` | `(file: UploadSettledFileInfo) => boolean` | Default for images | Whether to show thumbnail. |
| `render-icon` | `(file: UploadSettledFileInfo) => VNodeChild` | `undefined` | Custom file icon renderer. |
| `is-error-state` | `(xhr: XMLHttpRequest) => boolean` | `undefined` | Custom error state checker. |
| `input-props` | `InputHTMLAttributes` | `undefined` | Input element attributes. |
| `image-group-props` | `ImageGroupProps` | `undefined` | Props for internal image preview. |
| `trigger-class` | `string` | `undefined` | Trigger area class. |
| `trigger-style` | `Object \| string` | `undefined` | Trigger area style. |
| `file-list-class` | `string` | `undefined` | File list area class. |
| `file-list-style` | `Object` | `undefined` | File list area style. |

### UploadFileInfo Type

| Property | Type | Description |
| --- | --- | --- |
| `id` | `string \| number` | Unique file ID. |
| `name` | `string` | File name. |
| `status` | `'pending' \| 'uploading' \| 'error' \| 'finished' \| 'removed'` | Upload status. |
| `file` | `File \| null` | File object. |
| `url` | `string \| null` | File URL. |
| `thumbnailUrl` | `string \| null` | Thumbnail URL. |
| `type` | `string \| null` | MIME type. |
| `percentage` | `number` | Upload progress (0-100). |
| `batchId` | `string \| null` | Batch ID for grouped uploads. |
| `fullPath` | `string \| null` | Full path for directory uploads. |

### UploadCustomRequestOptions Type

```ts
interface UploadCustomRequestOptions {
  file: FileInfo;
  action?: string;
  data?:
    | Record<string, string>
    | (({ file }: { file: FileInfo }) => Record<string, string>);
  withCredentials?: boolean;
  headers?:
    | Record<string, string>
    | (({ file }: { file: FileInfo }) => Record<string, string>);
  onProgress: (e: { percent: number }) => void;
  onFinish: () => void;
  onError: () => void;
}
```

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `change` | `({ file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => void` | File status change callback. |
| `update:file-list` | `(fileList: UploadFileInfo[]) => void` | File list update callback. |
| `before-upload` | `({ file: UploadFileInfo, fileList: Array<UploadFileInfo> }) => Promise<boolean \| void> \| boolean \| void` | Pre-upload callback. Return `false` to cancel. |
| `finish` | `({ file: UploadFileInfo, event?: Event }) => UploadFileInfo \| undefined` | Upload complete callback. |
| `error` | `({ file: UploadFileInfo, event?: ProgressEvent }) => UploadFileInfo \| void` | Upload error callback. |
| `remove` | `({ file: UploadFileInfo, fileList: Array<UploadFileInfo>, index: number }) => Promise<boolean> \| boolean \| any` | File removal callback. Return `false` to cancel. |
| `download` | `(file: FileInfo) => Promise<boolean> \| boolean \| any` | Download button click callback. |
| `preview` | `(file: FileInfo, detail: { event: MouseEvent }) => void` | Preview button click callback. |
| `retry` | `({ file: UploadFileInfo }) => Promise<boolean \| void> \| boolean \| void` | Retry button click callback. |

### Methods

| Name | Type | Description |
| --- | --- | --- |
| `clear` | `() => void` | Clear the file list. |
| `openOpenFileDialog` | `() => void` | Open the file selection dialog. |
| `submit` | `(options?: { fileId?: string, retry?: boolean }) => void` | Submit pending files. |

### Slots

| Name      | Parameters | Description             |
| --------- | ---------- | ----------------------- |
| `default` | `()`       | Upload trigger content. |

### UploadDragger Slots

| Name      | Parameters | Description                 |
| --------- | ---------- | --------------------------- |
| `default` | `()`       | Drag and drop area content. |

### UploadTrigger Props

| Name       | Type      | Default | Description        |
| ---------- | --------- | ------- | ------------------ |
| `abstract` | `boolean` | `false` | Use abstract mode. |

### UploadTrigger Slots

| Name | Parameters | Description |
| --- | --- | --- |
| `default` | `{ handleClick, handleDragOver, handleDragEnter, handleDragLeave, handleDrop }` | Trigger slot with drag handlers. |

## Common Patterns

### Custom Request

```vue
<template>
  <n-upload
    action="https://naive-upload.free.beeceptor.com/"
    :headers="{
      Authorization: 'Bearer token',
    }"
    :custom-request="customRequest"
  >
    <n-button>Upload</n-button>
  </n-upload>
</template>

<script setup>
const customRequest = ({
  file,
  data,
  headers,
  onProgress,
  onFinish,
  onError,
}) => {
  const formData = new FormData();
  formData.append('file', file.file);

  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  fetch('https://your-upload-endpoint.com/upload', {
    method: 'POST',
    headers: headers,
    body: formData,
  })
    .then(response => {
      if (response.ok) {
        onFinish();
      } else {
        onError();
      }
    })
    .catch(() => onError());
};
</script>
```

### Before Upload Validation

```vue
<template>
  <n-upload
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    @before-upload="beforeUpload"
  >
    <n-button>Upload PNG Only</n-button>
  </n-upload>
</template>

<script setup>
const beforeUpload = ({ file }) => {
  if (file.type !== 'image/png') {
    console.error('Only PNG files are allowed!');
    return false;
  }
  return true;
};
</script>
```

### Modify File on Finish

```vue
<template>
  <n-upload
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    @finish="handleFinish"
  >
    <n-button>Upload</n-button>
  </n-upload>
</template>

<script setup>
const handleFinish = ({ file, event }) => {
  const response = JSON.parse(event.target.response);
  file.url = response.url;
  file.name = response.filename;
  return file;
};
</script>
```

### Split Trigger and List

```vue
<template>
  <n-upload
    abstract
    :default-file-list="fileList"
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  >
    <n-button-group>
      <n-button>Useless</n-button>
      <n-upload-trigger #="{ handleClick }" abstract>
        <n-button @click="handleClick"> Upload </n-button>
      </n-upload-trigger>
    </n-button-group>
    <n-card style="margin-top: 12px" title="File List">
      <n-upload-file-list />
    </n-card>
  </n-upload>
</template>
```

### Custom Download

```vue
<template>
  <n-upload
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image"
    show-download-button
    :custom-download="handleCustomDownload"
  >
    <n-button>Upload</n-button>
  </n-upload>
</template>

<script setup>
const handleCustomDownload = file => {
  fetch(file.url, {
    headers: { Authorization: 'Bearer token' },
  })
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    });
};
</script>
```

### Custom Thumbnail

```vue
<template>
  <n-upload
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image"
    :create-thumbnail-url="createThumbnailUrl"
  >
    <n-button>Upload</n-button>
  </n-upload>
</template>

<script setup>
const createThumbnailUrl = (file, fileInfo) => {
  if (file && file.type.startsWith('image/')) {
    return URL.createObjectURL(file);
  }
  return undefined;
};
</script>
```

### Preview with Modal

```vue
<template>
  <n-upload
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="previewFileList"
    list-type="image-card"
    @preview="handlePreview"
  />
  <n-modal
    v-model:show="showModal"
    preset="card"
    style="width: 600px"
    title="Preview"
  >
    <img :src="previewImageUrl" style="width: 100%" />
  </n-modal>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
const previewImageUrl = ref('');

const handlePreview = file => {
  previewImageUrl.value = file.url;
  showModal.value = true;
};
</script>
```

## Best Practices

### Performance

1. **Limit File Size**: Implement `before-upload` to check file sizes before uploading large files.

2. **Compress Images**: Consider compressing images on the client side before upload for better performance.

3. **Chunked Uploads**: For very large files, implement chunked uploads using `custom-request`.

### User Experience

1. **Clear Feedback**: Always show upload progress and status to users.

2. **File Type Restrictions**: Use `accept` attribute to filter file types in the file dialog.

3. **Error Handling**: Provide clear error messages when uploads fail.

4. **Retry Mechanism**: Keep `show-retry-button` enabled for failed uploads.

5. **Image Preview**: Use `list-type="image-card"` for image uploads to provide visual feedback.

### Security

1. **Server-Side Validation**: Always validate files on the server side, not just client-side.

2. **File Type Verification**: Check both file extension and MIME type.

3. **Size Limits**: Implement both client-side and server-side file size limits.

4. **Secure Headers**: Use `headers` prop to include authentication tokens.

### Data Handling

1. **Unique IDs**: Don't modify the `id` property of file objects; use external Map for additional data.

2. **File List State**: Use `v-model:file-list` for controlled mode when you need to manage the file list programmatically.

3. **Batch Operations**: Use `batchId` to track files uploaded together.

### Accessibility

1. **Keyboard Navigation**: Ensure upload triggers are keyboard accessible.

2. **Progress Announcements**: Consider adding ARIA live regions for progress updates.

3. **Error Messages**: Provide clear, accessible error messages for failed uploads.
