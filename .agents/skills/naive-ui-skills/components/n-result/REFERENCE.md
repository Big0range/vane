---
name: 'n-result'
description: 'Result component for displaying operation results or status pages. Invoke when user needs to show success, error, warning, or HTTP status pages in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Result Component

Result component for displaying operation results, status pages, and feedback with customizable icons and descriptions.

## When to Use

Use this component when:

- **Status pages**: Display HTTP error pages (404, 403, 500, 418)
- **Operation results**: Show success, error, warning, or info results
- **Feedback pages**: Provide visual feedback for completed actions
- **Empty states**: Display meaningful empty or error states

## When to Invoke

Invoke this skill when:

- User needs to display a result page
- User wants to show HTTP error pages
- User needs to display operation success/failure feedback
- User wants to customize result icons
- User asks about creating status pages

## Features

- **Preset Status Types**: info, success, warning, error, 404, 403, 500, 418
- **Customizable Icon**: Replace default icon with custom content
- **Size Options**: small, medium, large, and huge sizes
- **Flexible Content**: Custom title, description, and footer
- **Built-in Icons**: High-quality icons from twemoji

## API Reference

### Result Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| description | `string` | `undefined` | Description text. |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Size of the result. |
| status | `'info' \| 'success' \| 'warning' \| 'error' \| '404' \| '403' \| '500' \| '418'` | `'info'` | Status type. |
| title | `string` | `undefined` | Title text. |

### Result Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| default | `()` | Result page content information. |  |
| footer | `()` | Information at the bottom of the result page. |  |
| icon | `()` | Custom icon content area. | 2.24.0 |

## Basic Usage

### 404 Not Found

```vue
<template>
  <n-result
    status="404"
    title="404 Not Found"
    description="You know life is always ridiculous."
  >
    <template #footer>
      <n-button>Find Something Funny</n-button>
    </template>
  </n-result>
</template>
```

### 403 Forbidden

```vue
<template>
  <n-result
    status="403"
    title="403 Forbidden"
    description="Some of the doors are always close to you."
  >
    <template #footer>
      <n-button>Take It Easy</n-button>
    </template>
  </n-result>
</template>
```

### 500 Server Error

```vue
<template>
  <n-result
    status="500"
    title="500 Server Error"
    description="Server error may prove that you need hiring more developers."
  >
    <template #footer>
      <n-button>Spread Money Out</n-button>
    </template>
  </n-result>
</template>
```

### Success Result

```vue
<template>
  <n-result
    status="success"
    title="Success"
    description="Operation completed successfully"
  >
    <template #footer>
      <n-button type="primary" @click="handleContinue">Continue</n-button>
    </template>
  </n-result>
</template>

<script setup>
const handleContinue = () => {
  console.log('Continue clicked');
};
</script>
```

### Warning Result

```vue
<template>
  <n-result
    status="warning"
    title="Warning"
    description="People seldom see it until it comes true."
  >
    <template #footer>
      <n-button>Understood</n-button>
    </template>
  </n-result>
</template>
```

### Error Result

```vue
<template>
  <n-result status="error" title="Error" description="Something went wrong">
    <template #footer>
      <n-button type="error" @click="handleRetry">Retry</n-button>
    </template>
  </n-result>
</template>

<script setup>
const handleRetry = () => {
  console.log('Retry clicked');
};
</script>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-result
      status="404"
      title="Small"
      description="Small size"
      size="small"
    />
    <n-result
      status="404"
      title="Medium"
      description="Medium size"
      size="medium"
    />
    <n-result
      status="404"
      title="Large"
      description="Large size"
      size="large"
    />
    <n-result status="404" title="Huge!" description="Huge size" size="huge" />
  </n-space>
</template>
```

### Custom Icon

```vue
<template>
  <n-result
    title="Custom Icon"
    description="You can put any content in the icon slot"
  >
    <template #icon>
      <n-icon size="80" color="#18a058">
        <CheckmarkCircle />
      </n-icon>
    </template>
    <template #footer>
      <n-button type="primary">Great!</n-button>
    </template>
  </n-result>
</template>

<script setup>
import { CheckmarkCircle } from '@vicons/ionicons5';
</script>
```

## Common Patterns

### Full Page 404

```vue
<template>
  <div class="error-page">
    <n-result status="404" title="404" description="Page not found">
      <template #footer>
        <n-space>
          <n-button @click="goBack">Go Back</n-button>
          <n-button type="primary" @click="goHome">Go Home</n-button>
        </n-space>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => router.back();
const goHome = () => router.push('/');
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
```

### Payment Result

```vue
<template>
  <n-card>
    <n-result
      :status="paymentSuccess ? 'success' : 'error'"
      :title="paymentSuccess ? 'Payment Successful' : 'Payment Failed'"
      :description="
        paymentSuccess ? 'Your order has been confirmed' : 'Please try again'
      "
    >
      <template #footer>
        <n-space>
          <n-button v-if="paymentSuccess" type="primary" @click="viewOrder">
            View Order
          </n-button>
          <n-button v-else type="primary" @click="retryPayment">
            Retry Payment
          </n-button>
        </n-space>
      </template>
    </n-result>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';

const paymentSuccess = ref(true);

const viewOrder = () => console.log('View order');
const retryPayment = () => console.log('Retry payment');
</script>
```

### Form Submission Result

```vue
<template>
  <div>
    <n-form v-if="!submitted" ref="formRef" :model="formData">
      <n-form-item label="Email" path="email">
        <n-input v-model:value="formData.email" />
      </n-form-item>
      <n-button type="primary" @click="handleSubmit">Submit</n-button>
    </n-form>

    <n-result
      v-else
      :status="submitSuccess ? 'success' : 'error'"
      :title="submitSuccess ? 'Submitted' : 'Failed'"
      :description="
        submitSuccess ? 'We will contact you soon' : 'Please try again later'
      "
    >
      <template #footer>
        <n-button @click="reset">Submit Another</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const submitted = ref(false);
const submitSuccess = ref(true);
const formData = reactive({ email: '' });

const handleSubmit = () => {
  submitted.value = true;
};

const reset = () => {
  submitted.value = false;
  formData.email = '';
};
</script>
```

### Custom Illustration

```vue
<template>
  <n-result title="Welcome" description="Let's get started">
    <template #icon>
      <img
        src="/welcome-illustration.svg"
        alt="Welcome"
        style="width: 200px;"
      />
    </template>
    <template #default>
      <div style="text-align: center; padding: 20px;">
        <p>Follow the steps below to complete your setup</p>
        <n-steps :current="1" size="small">
          <n-step title="Profile" />
          <n-step title="Preferences" />
          <n-step title="Complete" />
        </n-steps>
      </div>
    </template>
    <template #footer>
      <n-button type="primary">Get Started</n-button>
    </template>
  </n-result>
</template>
```

### Maintenance Page

```vue
<template>
  <div class="maintenance-page">
    <n-result
      status="418"
      title="Under Maintenance"
      description="We'll be back soon"
    >
      <template #icon>
        <n-icon size="100">
          <ConstructOutline />
        </n-icon>
      </template>
      <template #footer>
        <n-space vertical>
          <n-text depth="3">Estimated time: 30 minutes</n-text>
          <n-button @click="checkStatus">Check Status</n-button>
        </n-space>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { ConstructOutline } from '@vicons/ionicons5';

const checkStatus = () => {
  console.log('Checking status...');
};
</script>
```

## Best Practices

1. **Use appropriate status**: Match the status to the actual situation

   ```vue
   <n-result status="404" title="Not Found" />
   ```

2. **Provide actionable buttons**: Add footer buttons for user actions

   ```vue
   <n-result status="error" title="Error">
     <template #footer>
       <n-button type="primary" @click="retry">Retry</n-button>
     </template>
   </n-result>
   ```

3. **Clear descriptions**: Write helpful descriptions

   ```vue
   <n-result
     description="The page you're looking for doesn't exist or has been moved"
   />
   ```

4. **Match size to context**: Use appropriate size for the page layout

   ```vue
   <n-result size="small" />
   <!-- In cards or modals -->
   <n-result size="huge" />
   <!-- Full page results -->
   ```

5. **Custom icons for branding**: Use custom icons for brand consistency

   ```vue
   <n-result>
     <template #icon>
       <CompanyLogo />
     </template>
   </n-result>
   ```

6. **Center on page**: Center result components for better visual impact
   ```vue
   <div
     style="display: flex; justify-content: center; align-items: center; min-height: 100vh;"
   >
     <n-result status="404" />
   </div>
   ```
