# Naive UI Skills - Agents Documentation

This document provides detailed information about all agents (skills) available in the Naive UI Skills Library.

## 📋 Agent Index

| Category | Skills Count | Description |
| --- | --- | --- |
| [Basic Components](#basic-components-agents) | 15 | UI elements for basic interactions |
| [Form Components](#form-components-agents) | 22 | Form inputs and data collection |
| [Data Display](#data-display-agents) | 21 | Data visualization and presentation |
| [Navigation](#navigation-agents) | 9 | Navigation and routing components |
| [Feedback](#feedback-agents) | 17 | User feedback and notifications |
| [Layout](#layout-agents) | 6 | Page layout and structure |
| [Utility](#utility-agents) | 4 | Utility and helper components |
| [Config](#config-agents) | 3 | Configuration and global settings |
| [Design Specs](#design-specifications-agents) | 5 | Design system specifications |
| [Foundation](#foundation-agents) | 6 | Core setup and configuration |

---

## Basic Components Agents

### n-avatar

**Description**: Displays user avatars with images, icons, or characters.

**Use Cases**:

- User profile pictures
- Team member displays
- Entity representations
- Avatar groups

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | src | string | - | Image source URL | | icon | Component | - | Icon component | | size | number/string | 'medium' | Size: tiny, small, medium, large, huge or number | | round | boolean | false | Round shape | | object-fit | string | 'fill' | Object fit: fill, contain, cover, none |

**Example**:

```vue
<n-avatar :size="48" src="avatar.jpg" round />
<n-avatar :size="40">
  <n-icon><UserIcon /></n-icon>
</n-avatar>
```

---

### n-button

**Description**: Basic button with various types, sizes, and styles.

**Use Cases**:

- Form submissions
- Action triggers
- Navigation controls
- Interactive elements

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | type | string | 'default' | Type: default, primary, info, success, warning, error | | size | string | 'medium' | Size: tiny, small, medium, large | | secondary | boolean | false | Secondary style | | tertiary | boolean | false | Tertiary style | | quaternary | boolean | false | Quaternary style | | round | boolean | false | Round corners | | circle | boolean | false | Circle shape | | disabled | boolean | false | Disabled state | | loading | boolean | false | Loading state |

**Example**:

```vue
<n-button type="primary" @click="handleClick">Primary Button</n-button>
<n-button type="success" secondary>Secondary Success</n-button>
<n-button circle>
  <template #icon>
    <n-icon><PlusIcon /></n-icon>
  </template>
</n-button>
```

---

### n-card

**Description**: Integrates information in a card container with header and footer support.

**Use Cases**:

- Dashboard cards
- Content sections
- Product displays
- Information grouping

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | title | string | - | Card title | | hoverable | boolean | false | Hover effect | | bordered | boolean | true | Show border | | size | string | 'medium' | Size: small, medium, large, huge | | segmented | boolean/object | false | Segmented style |

**Example**:

```vue
<n-card title="Card Title" hoverable>
  Card content
  <template #footer>
    <n-button>Footer Action</n-button>
  </template>
</n-card>
```

---

### n-carousel

**Description**: Loops images or texts in limited space with autoplay support.

**Use Cases**:

- Image sliders
- Content carousels
- Rotating banners
- Product showcases

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | autoplay | boolean | false | Auto loop | | interval | number | 5000 | Interval in ms | | dot-placement | string | 'bottom' | Dot position: top, bottom, left, right | | dot-type | string | 'dot' | Dot type: dot, line | | show-arrow | boolean | false | Show navigation arrows | | effect | string | 'slide' | Transition effect: slide, fade, card, custom |

**Example**:

```vue
<n-carousel autoplay :interval="3000">
  <n-carousel-item v-for="item in items" :key="item.id">
    <img :src="item.src" />
  </n-carousel-item>
</n-carousel>
```

---

### n-collapse

**Description**: Stores content in expandable panels.

**Use Cases**:

- FAQ sections
- Accordion panels
- Collapsible content areas

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | expanded-names | string/array | - | Expanded panel names | | accordion | boolean | false | Accordion mode | | display-directive | string | 'if' | Render directive: if, show | | trigger-areas | string | 'main' | Click area: main, header, arrow |

**Example**:

```vue
<n-collapse v-model:expanded-names="expandedNames" accordion>
  <n-collapse-item title="Panel 1" name="1">Content 1</n-collapse-item>
  <n-collapse-item title="Panel 2" name="2">Content 2</n-collapse-item>
</n-collapse>
```

---

### n-divider

**Description**: Creates dividing lines between content.

**Use Cases**:

- Content separation
- Section dividers
- Visual grouping

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | vertical | boolean | false | Vertical divider | | dashed | boolean | false | Dashed line | | title-placement | string | 'center' | Title position: left, center, right |

**Example**:

```vue
<n-divider />
<n-divider title-placement="left">Left Title</n-divider>
<n-divider vertical />
```

---

### n-dropdown

**Description**: Toggleable dropdown menus with rich content support.

**Use Cases**:

- Navigation menus
- Action menus
- Context menus

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | options | array | - | Menu options | | trigger | string | 'hover' | Trigger: hover, click, manual | | placement | string | 'bottom' | Placement position | | show | boolean | false | Visibility control | | disabled | boolean | false | Disabled state |

**Example**:

```vue
<n-dropdown :options="options" @select="handleSelect">
  <n-button>Dropdown</n-button>
</n-dropdown>
```

---

### n-ellipsis

**Description**: Truncates text with ellipsis and tooltip support.

**Use Cases**:

- Long text truncation
- Table cell content
- Title displays

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | line-clamp | number | - | Maximum lines | | expand-trigger | string | - | Trigger: click | | tooltip | boolean/object | true | Show tooltip |

**Example**:

```vue
<n-ellipsis :line-clamp="2">
  Very long text that will be truncated after two lines...
</n-ellipsis>
```

---

### n-float-button

**Description**: Floating action button for quick actions.

**Use Cases**:

- Quick actions
- Back to top
- Floating toolbars

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | position | string | 'bottom-right' | Position | | type | string | 'primary' | Button type | | shape | string | 'circle' | Shape: circle, square | | menu | array | - | Menu items |

**Example**:

```vue
<n-float-button position="bottom-right">
  <template #default>
    <n-icon><PlusIcon /></n-icon>
  </template>
</n-float-button>
```

---

### n-gradient-text

**Description**: Text with gradient color effect.

**Use Cases**:

- Headlines
- Brand text
- Decorative text

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | type | string | 'info' | Gradient type | | gradient | string/object | - | Custom gradient | | size | string | 'medium' | Text size |

**Example**:

```vue
<n-gradient-text type="info">Gradient Text</n-gradient-text>
<n-gradient-text
  :gradient="{ from: '#00f', to: '#f00' }"
>Custom</n-gradient-text>
```

---

### n-icon

**Description**: Icon wrapper component with size and color support.

**Use Cases**:

- UI icons
- Button icons
- Status indicators

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | size | number/string | - | Icon size | | color | string | - | Icon color | | depth | number | - | Color depth |

**Example**:

```vue
<n-icon :size="24" color="#409eff">
  <CheckIcon />
</n-icon>
```

---

### n-page-header

**Description**: Page navigation headers with back action.

**Use Cases**:

- Page headers
- Back navigation
- Title sections

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | title | string | - | Main title | | subtitle | string | - | Subtitle | | show-back | boolean | false | Show back button |

**Example**:

```vue
<n-page-header title="Page Title" subtitle="Subtitle" @back="goBack">
  <template #extra>
    <n-button>Action</n-button>
  </template>
</n-page-header>
```

---

### n-tag

**Description**: Labels and markers for categorization.

**Use Cases**:

- Category labels
- Status tags
- Removable filters

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | type | string | 'default' | Type: default, primary, info, success, warning, error | | size | string | 'medium' | Size: small, medium, large | | bordered | boolean | false | Show border | | round | boolean | false | Round shape | | closable | boolean | false | Removable | | disabled | boolean | false | Disabled state |

**Example**:

```vue
<n-tag type="success">Success</n-tag>
<n-tag type="error" closable @close="handleClose">Error</n-tag>
```

---

### n-typography

**Description**: Typography components for text display.

**Use Cases**:

- Headlines
- Paragraphs
- Text styling

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | type | string | 'default' | Text type | | code | boolean | false | Code style | | delete | boolean | false | Strikethrough | | strong | boolean | false | Bold text | | underline | boolean | false | Underline |

**Example**:

```vue
<n-text type="primary">Primary text</n-text>
<n-h1>Heading 1</n-h1>
<n-p>Paragraph content</n-p>
```

---

### n-watermark

**Description**: Text or pattern watermarks for content protection.

**Use Cases**:

- Content protection
- Branding
- Copyright notices

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | content | string/array | - | Watermark text | | cross | boolean | false | Cross pattern | | fullscreen | boolean | false | Fullscreen mode | | font-size | number | 14 | Font size | | line-height | number | 16 | Line height |

**Example**:

```vue
<n-watermark content="Confidential">
  <div style="height: 500px">Content</div>
</n-watermark>
```

---

## Form Components Agents

### n-auto-complete

**Description**: Input suggestions based on user input.

**Use Cases**:

- Search suggestions
- Form autocomplete
- Address inputs

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | string | - | Binding value | | options | array | - | Suggestion options | | placeholder | string | - | Placeholder text | | clear-after-select | boolean | false | Clear after selection | | get-show | function | - | Show condition |

**Example**:

```vue
<n-auto-complete
  v-model:value="value"
  :options="options"
  placeholder="Search..."
/>
```

---

### n-cascader

**Description**: Hierarchical option selection.

**Use Cases**:

- Region selection
- Category hierarchies
- Organizational structures

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | string/array | - | Selected values | | options | array | - | Data options | | multiple | boolean | false | Multiple selection | | check-strategy | string | 'all' | Selection strategy: all, parent, child | | filterable | boolean | false | Enable search | | show-path | boolean | true | Show full path |

**Example**:

```vue
<n-cascader v-model:value="value" :options="options" />
```

---

### n-checkbox

**Description**: Multiple choice selection.

**Use Cases**:

- Multiple selections
- Check-all functionality
- Toggle states

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | checked | boolean | false | Checked state | | indeterminate | boolean | false | Indeterminate state | | disabled | boolean | false | Disabled state | | value | string/number | - | Checkbox value |

**Example**:

```vue
<n-checkbox-group v-model:value="checkedValues">
  <n-checkbox value="option1">Option 1</n-checkbox>
  <n-checkbox value="option2">Option 2</n-checkbox>
</n-checkbox-group>
```

---

### n-color-picker

**Description**: Color selection with multiple formats.

**Use Cases**:

- Theme customization
- Color selection
- Design tools

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | string | - | Selected color | | show-alpha | boolean | false | Show alpha slider | | modes | array | ['hex', 'rgb', 'hsl'] | Color modes | | swatches | array | - | Preset colors |

**Example**:

```vue
<n-color-picker v-model:value="color" :show-alpha="true" />
```

---

### n-date-picker

**Description**: Date selection with various types.

**Use Cases**:

- Date input
- Date range selection
- Scheduling

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | number/string/array | - | Selected date | | type | string | 'date' | Type: date, datetime, daterange, datetimerange, month, year | | format | string | 'yyyy-MM-dd' | Display format | | clearable | boolean | true | Show clear button | | shortcuts | object | - | Quick selection options |

**Example**:

```vue
<n-date-picker v-model:value="timestamp" type="daterange" clearable />
```

---

### n-dynamic-input

**Description**: Dynamic input fields management.

**Use Cases**:

- Dynamic form fields
- Variable input lists
- Multi-value inputs

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | array | - | Input values | | preset | string | - | Preset type: input, pair | | min | number | 0 | Minimum items | | max | number | - | Maximum items |

**Example**:

```vue
<n-dynamic-input v-model:value="values" :on-create="onCreate">
  <template #default="{ value }">
    <n-input v-model:value="value" />
  </template>
</n-dynamic-input>
```

---

### n-dynamic-tags

**Description**: Dynamic tag input and management.

**Use Cases**:

- Tag management
- Keyword input
- Label editing

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | array | - | Tag values | | max | number | - | Maximum tags | | closable | boolean | true | Removable tags |

**Example**:

```vue
<n-dynamic-tags v-model:value="tags" />
```

---

### n-form

**Description**: Form management and validation.

**Use Cases**:

- Data collection
- Form validation
- Form submission

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | model | object | - | Form data model | | rules | object | - | Validation rules | | label-placement | string | 'left' | Label position: left, top | | label-width | string/number | 'auto' | Label width | | require-mark-placement | string | 'right' | Required mark position |

**Example**:

```vue
<n-form ref="formRef" :model="form" :rules="rules">
  <n-form-item label="Name" path="name">
    <n-input v-model:value="form.name" />
  </n-form-item>
</n-form>
```

---

### n-input

**Description**: Text input with various configurations.

**Use Cases**:

- Text input
- Password input
- Textarea

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | string | - | Binding value | | type | string | 'text' | Type: text, password, textarea | | placeholder | string | - | Placeholder text | | disabled | boolean | false | Disabled state | | clearable | boolean | false | Show clear button | | maxlength | number | - | Maximum length | | show-count | boolean | false | Show character count |

**Example**:

```vue
<n-input v-model:value="input" placeholder="Enter text" clearable />
<n-input type="textarea" v-model:value="textarea" :rows="4" />
```

---

### n-input-number

**Description**: Numeric input with increment controls.

**Use Cases**:

- Quantity inputs
- Numeric settings
- Range-limited numbers

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | number | null | Binding value | | min | number | - | Minimum value | | max | number | - | Maximum value | | step | number | 1 | Step size | | precision | number | 0 | Decimal precision | | show-button | boolean | true | Show increment buttons |

**Example**:

```vue
<n-input-number v-model:value="num" :min="1" :max="10" />
```

---

### n-input-otp

**Description**: One-time password input component.

**Use Cases**:

- OTP verification
- Code input
- Security verification

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | string | - | OTP value | | length | number | 6 | Number of inputs | | gap | number | 0 | Gap between inputs |

**Example**:

```vue
<n-input-otp v-model:value="otp" :length="6" />
```

---

### n-mention

**Description**: Mention input for @user references.

**Use Cases**:

- @ mentions
- User tagging
- Rich text input

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | string | - | Input value | | options | array | - | Mention options | | prefix | string/array | '@' | Trigger character | | separator | string | ' ' | Separator |

**Example**:

```vue
<n-mention v-model:value="text" :options="users" />
```

---

### n-radio

**Description**: Single selection from options.

**Use Cases**:

- Single selection
- Radio groups
- Settings selection

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | checked | boolean | false | Checked state | | value | string/number | - | Radio value | | disabled | boolean | false | Disabled state | | name | string | - | Radio group name |

**Example**:

```vue
<n-radio-group v-model:value="selected">
  <n-radio value="1">Option A</n-radio>
  <n-radio value="2">Option B</n-radio>
</n-radio-group>
```

---

### n-rate

**Description**: Star rating functionality.

**Use Cases**:

- User ratings
- Product reviews
- Feedback scoring

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | number | 0 | Rating value | | count | number | 5 | Maximum stars | | allow-half | boolean | false | Allow half stars | | readonly | boolean | false | Read only | | clearable | boolean | false | Can reset to 0 |

**Example**:

```vue
<n-rate v-model:value="rating" allow-half />
```

---

### n-select

**Description**: Dropdown selection component.

**Use Cases**:

- Single selection
- Multiple selection
- Searchable dropdowns

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | any/array | - | Selected value(s) | | options | array | - | Select options | | multiple | boolean | false | Multiple selection | | filterable | boolean | false | Enable search | | clearable | boolean | false | Show clear button | | placeholder | string | 'Please Select' | Placeholder text | | tag | boolean | false | Tag mode for multiple |

**Example**:

```vue
<n-select v-model:value="value" :options="options" clearable />
```

---

### n-slider

**Description**: Numeric range selection with dragging.

**Use Cases**:

- Volume controls
- Price range filters
- Progress indicators

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | number/array | 0 | Slider value | | min | number | 0 | Minimum value | | max | number | 100 | Maximum value | | step | number | 1 | Step size | | range | boolean | false | Range mode | | marks | object | - | Mark points |

**Example**:

```vue
<n-slider v-model:value="value" :min="0" :max="100" />
<n-slider v-model:value="range" range :max="1000" />
```

---

### n-switch

**Description**: Toggle between two opposing states.

**Use Cases**:

- Enable/disable features
- Toggle settings
- On/off switches

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | boolean | false | Switch state | | disabled | boolean | false | Disabled state | | loading | boolean | false | Loading state | | round | boolean | true | Round shape | | rail-style | object | - | Rail style |

**Example**:

```vue
<n-switch v-model:value="enabled" />
```

---

### n-time-picker

**Description**: Time selection with various formats.

**Use Cases**:

- Time input
- Time range selection
- Scheduling

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | number/array | - | Selected time (timestamp) | | format | string | 'HH:mm:ss' | Display format | | hour-format | string | 'HH' | Hour format: HH, hh | | is-range | boolean | false | Range mode | | clearable | boolean | true | Show clear button |

**Example**:

```vue
<n-time-picker v-model:value="time" format="HH:mm" />
```

---

### n-transfer

**Description**: Dual-column list selection.

**Use Cases**:

- Permission management
- Multi-select from large datasets
- Item categorization

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | array | - | Selected items | | options | array | - | Source data | | source-title | string | - | Source panel title | | target-title | string | - | Target panel title | | filterable | boolean | false | Enable search |

**Example**:

```vue
<n-transfer v-model:value="selected" :options="options" />
```

---

### n-tree-select

**Description**: Tree-based dropdown selection.

**Use Cases**:

- Organization structure selection
- Category tree selection
- Hierarchical data selection

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | any/array | - | Selected value | | options | array | - | Tree data | | multiple | boolean | false | Multiple selection | | check-strategy | string | 'all' | Selection strategy | | filterable | boolean | false | Enable search |

**Example**:

```vue
<n-tree-select v-model:value="value" :options="treeData" />
```

---

### n-upload

**Description**: File upload with drag-and-drop.

**Use Cases**:

- File uploads
- Image uploads
- Avatar uploads

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | action | string | - | Upload URL | | file-list | array | - | File list | | multiple | boolean | false | Multiple files | | directory | boolean | false | Directory upload | | drag | boolean | false | Drag and drop | | accept | string | - | Accepted file types | | max | number | - | Maximum files | | list-type | string | 'text' | List type: text, image, image-card |

**Example**:

```vue
<n-upload action="/upload" :file-list="fileList" :max="5">
  <n-button>Upload Files</n-button>
</n-upload>
```

---

## Data Display Agents

### n-calendar

**Description**: Date display with events.

**Use Cases**:

- Calendar views
- Event scheduling
- Date selection

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | number | - | Selected date timestamp | | is-date-disabled | function | - | Disable date function | | on-panel-change | function | - | Panel change callback |

**Example**:

```vue
<n-calendar v-model:value="timestamp" />
```

---

### n-code

**Description**: Code display with syntax highlighting.

**Use Cases**:

- Code display
- Syntax highlighting
- Code snippets

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | code | string | - | Code content | | language | string | - | Programming language | | trim | boolean | true | Trim whitespace | | hljs | object | - | Highlight.js instance |

**Example**:

```vue
<n-code :code="codeString" language="javascript" />
```

---

### n-countdown

**Description**: Countdown timer display.

**Use Cases**:

- Countdown timers
- Event countdowns
- Time limits

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | duration | number | 0 | Duration in ms | | active | boolean | true | Running state | | precision | number | 0 | Decimal precision | | on-finish | function | - | Finish callback |

**Example**:

```vue
<n-countdown :duration="60000" @finish="handleFinish" />
```

---

### n-data-table

**Description**: Advanced data table with sorting, filtering, and pagination.

**Use Cases**:

- Data tables
- Data grids
- Tabular data display

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | columns | array | - | Column definitions | | data | array | - | Table data | | row-key | string/function | - | Row key | | pagination | object/boolean | false | Pagination config | | sorting | object | - | Sorting state | | loading | boolean | false | Loading state | | bordered | boolean | false | Show borders | | striped | boolean | false | Striped rows |

**Example**:

```vue
<n-data-table
  :columns="columns"
  :data="data"
  :pagination="pagination"
  :row-key="row => row.id"
/>
```

---

### n-descriptions

**Description**: Multiple fields in list form.

**Use Cases**:

- Product details
- User profiles
- Information summaries

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | column | number | 3 | Number of columns | | label-placement | string | 'left' | Label position | | bordered | boolean | false | Show border | | size | string | 'medium' | Size |

**Example**:

```vue
<n-descriptions label-placement="left" bordered>
  <n-descriptions-item label="Name">John</n-descriptions-item>
  <n-descriptions-item label="Email">john@example.com</n-descriptions-item>
</n-descriptions>
```

---

### n-empty

**Description**: Placeholder hints for empty states.

**Use Cases**:

- Empty data states
- No search results
- Placeholder content

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | description | string | - | Description text | | show-icon | boolean | true | Show icon | | size | string | 'medium' | Size: small, medium, large, huge |

**Example**:

```vue
<n-empty description="No data">
  <template #extra>
    <n-button type="primary">Add Data</n-button>
  </template>
</n-empty>
```

---

### n-equation

**Description**: Mathematical equation rendering.

**Use Cases**:

- Math equations
- Formula display
- Scientific content

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | string | - | LaTeX equation | | katex | object | - | KaTeX instance |

**Example**:

```vue
<n-equation :value="equation" />
```

---

### n-heatmap

**Description**: Heatmap visualization for data patterns.

**Use Cases**:

- Activity heatmaps
- Data patterns
- Calendar heatmaps

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | array | - | Heatmap data | | start-date | number | - | Start date timestamp | | end-date | number | - | End date timestamp |

**Example**:

```vue
<n-heatmap :value="data" />
```

---

### n-highlight

**Description**: Text highlighting component.

**Use Cases**:

- Search highlighting
- Text emphasis
- Keyword marking

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | text | string | - | Full text | | patterns | array | - | Patterns to highlight | | case-sensitive | boolean | false | Case sensitive |

**Example**:

```vue
<n-highlight :text="content" :patterns="['keyword']" />
```

---

### n-image

**Description**: Images with lazy load and preview.

**Use Cases**:

- Image display
- Image galleries
- Lazy loading images

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | src | string | - | Image URL | | width | string/number | - | Image width | | height | string/number | - | Image height | | lazy | boolean | false | Enable lazy load | | object-fit | string | 'fill' | Fit mode | | preview-disabled | boolean | false | Disable preview |

**Example**:

```vue
<n-image :src="url" :width="200" lazy />
<n-image-group>
  <n-image v-for="img in images" :key="img.id" :src="img.src" />
</n-image-group>
```

---

### n-infinite-scroll

**Description**: Infinite scrolling container.

**Use Cases**:

- Infinite scrolling lists
- Lazy loading content
- Pagination on scroll

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | distance | number | 0 | Trigger distance | | on-load | function | - | Load callback |

**Example**:

```vue
<n-infinite-scroll @load="handleLoad">
  <div v-for="item in items" :key="item.id">{{ item }}</div>
</n-infinite-scroll>
```

---

### n-list

**Description**: List display component.

**Use Cases**:

- Item lists
- Content lists
- Simple data display

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | bordered | boolean | false | Show border | | clickable | boolean | false | Clickable items | | hoverable | boolean | false | Hover effect | | show-divider | boolean | true | Show dividers |

**Example**:

```vue
<n-list hoverable clickable>
  <n-list-item v-for="item in items" :key="item.id">
    {{ item.name }}
  </n-list-item>
</n-list>
```

---

### n-log

**Description**: Log display component.

**Use Cases**:

- Log viewers
- Console output
- Terminal displays

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | lines | array | - | Log lines | | loading | boolean | false | Loading state | | trim | boolean | true | Trim whitespace | | language | string | 'log' | Language for highlighting |

**Example**:

```vue
<n-log :lines="logLines" />
```

---

### n-number-animation

**Description**: Animated number display.

**Use Cases**:

- Animated counters
- Number transitions
- Dashboard statistics

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | from | number | 0 | Starting value | | to | number | - | Target value | | duration | number | 3000 | Animation duration | | precision | number | 0 | Decimal precision |

**Example**:

```vue
<n-number-animation :from="0" :to="1000" :duration="2000" />
```

---

### n-qr-code

**Description**: QR code generation.

**Use Cases**:

- QR code display
- Mobile sharing
- Quick links

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | string | - | QR code content | | size | number | 100 | QR code size | | color | string | '#000' | QR code color | | background-color | string | '#FFF' | Background color |

**Example**:

```vue
<n-qr-code :value="url" :size="200" />
```

---

### n-statistic

**Description**: Numerical statistics display.

**Use Cases**:

- Dashboard statistics
- Count displays
- Amount displays

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | number | - | Numeric value | | label | string | - | Label text | | tabular-nums | boolean | true | Tabular numbers |

**Example**:

```vue
<n-statistic label="Total Users" :value="268500" />
```

---

### n-table

**Description**: Simple table component.

**Use Cases**:

- Simple tables
- Static data display
- Basic tabular data

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | bordered | boolean | false | Show borders | | single-line | boolean | true | Single line mode | | striped | boolean | false | Striped rows | | bottom-bordered | boolean | true | Bottom border |

**Example**:

```vue
<n-table :bordered="false" :single-line="false">
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>25</td>
    </tr>
  </tbody>
</n-table>
```

---

### n-thing

**Description**: Content container with avatar and header.

**Use Cases**:

- Comment displays
- Article previews
- Card-like content

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | title | string | - | Title | | description | string | - | Description | | content | string | - | Content | | content-indented | boolean | false | Indent content |

**Example**:

```vue
<n-thing title="Title" description="Description">
  Content goes here
  <template #avatar>
    <n-avatar src="avatar.jpg" />
  </template>
</n-thing>
```

---

### n-time

**Description**: Time display and formatting.

**Use Cases**:

- Time display
- Relative time
- Time formatting

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | time | number | - | Timestamp | | type | string | 'relative' | Type: relative, datetime, date | | format | string | - | Display format | | to | number | Date.now() | Reference time |

**Example**:

```vue
<n-time :time="timestamp" type="relative" />
<n-time :time="timestamp" format="yyyy-MM-dd HH:mm" />
```

---

### n-timeline

**Description**: Chronological event display.

**Use Cases**:

- Activity history
- Chronological events
- Process logs

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | horizontal | boolean | false | Horizontal mode | | item-placement | string | 'left' | Item position |

**Example**:

```vue
<n-timeline>
  <n-timeline-item title="Event 1" time="2024-01-01">Content 1</n-timeline-item>
  <n-timeline-item title="Event 2" time="2024-01-02">Content 2</n-timeline-item>
</n-timeline>
```

---

### n-tree

**Description**: Hierarchical data display.

**Use Cases**:

- Folder structures
- Organization charts
- Category trees

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | data | array | - | Tree data | | key-field | string | 'key' | Key field name | | label-field | string | 'label' | Label field name | | children-field | string | 'children' | Children field name | | selectable | boolean | false | Enable selection | | checkable | boolean | false | Enable checkboxes | | default-expand-all | boolean | false | Expand all nodes | | block-line | boolean | false | Block line mode |

**Example**:

```vue
<n-tree :data="treeData" block-line expand-on-click />
```

---

## Navigation Agents

### n-affix

**Description**: Fixes elements to a specific visible area for sticky navigation.

**Use Cases**:

- Sticky navigation headers
- Fixed toolbars while scrolling
- Persistent action buttons
- Floating sidebars

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | top | number | - | Top offset | | bottom | number | - | Bottom offset | | position | string | 'top' | Position: top, bottom | | trigger-top | number | - | Trigger top position | | trigger-bottom | number | - | Trigger bottom position |

**Example**:

```vue
<n-affix :top="60">
  <n-button type="primary">Fixed Button</n-button>
</n-affix>
```

---

### n-anchor

**Description**: Anchor navigation for quick page section navigation.

**Use Cases**:

- Table of contents
- Document navigation
- Section anchors
- Quick page navigation

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | bound | number | 12 | Anchor bound | | offset-target | string/HTMLElement | - | Offset target | | ignore-gap | boolean | false | Ignore gap |

**Example**:

```vue
<n-anchor>
  <n-anchor-link title="Section 1" href="#section1" />
  <n-anchor-link title="Section 2" href="#section2">
    <n-anchor-link title="Subsection" href="#subsection" />
  </n-anchor-link>
</n-anchor>
```

---

### n-back-top

**Description**: Back-to-top button for long page navigation.

**Use Cases**:

- Long page navigation
- Quick scroll to top
- Improved user experience

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | right | number | 40 | Right distance | | bottom | number | 40 | Bottom distance | | visibility-height | number | 180 | Min height to show button |

**Example**:

```vue
<n-back-top :right="50" :bottom="100" />
```

---

### n-breadcrumb

**Description**: Displays page location for easier navigation.

**Use Cases**:

- Page navigation paths
- Category hierarchies
- Document structures

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | separator | string | '/' | Separator character |

**Example**:

```vue
<n-breadcrumb>
  <n-breadcrumb-item>Home</n-breadcrumb-item>
  <n-breadcrumb-item>Category</n-breadcrumb-item>
  <n-breadcrumb-item>Page</n-breadcrumb-item>
</n-breadcrumb>
```

---

### n-loading-bar-provider

**Description**: Loading bar for page loading indication.

**Use Cases**:

- Page loading
- Route transitions
- Async operations

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | loading-bar-style | object | - | Loading bar style | | to | string | - | Mount target |

**Example**:

```vue
<template>
  <n-loading-bar-provider>
    <router-view />
  </n-loading-bar-provider>
</template>

<script setup>
import { useLoadingBar } from 'naive-ui';
const loadingBar = useLoadingBar();
loadingBar.start();
loadingBar.finish();
</script>
```

---

### n-menu

**Description**: Navigation menu system.

**Use Cases**:

- Navigation menus
- Side navigation
- Top navigation

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | string | - | Active menu key | | mode | string | 'horizontal' | Mode: vertical, horizontal | | options | array | - | Menu options | | collapsed | boolean | false | Collapse mode | | collapsed-width | number | 48 | Collapsed width | | indent | number | 32 | Indent width |

**Example**:

```vue
<n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
```

---

### n-pagination

**Description**: Page navigation for large datasets.

**Use Cases**:

- Data pagination
- Search results
- List navigation

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | page | number | 1 | Current page | | page-size | number | 10 | Items per page | | page-count | number | 1 | Total pages | | item-count | number | - | Total items | | page-sizes | array | [10] | Page size options | | show-size-picker | boolean | false | Show size picker | | show-quick-jumper | boolean | false | Show quick jumper |

**Example**:

```vue
<n-pagination
  v-model:page="currentPage"
  v-model:page-size="pageSize"
  :item-count="total"
  show-size-picker
  :page-sizes="[10, 20, 30]"
/>
```

---

### n-steps

**Description**: Step-by-step process guide.

**Use Cases**:

- Wizard interfaces
- Process workflows
- Step progress indicators

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | current | number | - | Current step | | status | string | 'process' | Status: process, finish, error, wait | | vertical | boolean | false | Vertical mode |

**Example**:

```vue
<n-steps :current="current">
  <n-step title="Step 1" description="Description" />
  <n-step title="Step 2" description="Description" />
  <n-step title="Step 3" description="Description" />
</n-steps>
```

---

### n-tabs

**Description**: Tabbed content organization.

**Use Cases**:

- Tabbed content
- Content organization
- Multi-panel interfaces

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | string | - | Active tab name | | type | string | 'bar' | Type: bar, line, card, segment | | tab-style | object | - | Tab style | | justify-content | string | - | Justify content | | animated | boolean | true | Enable animation | | pane-style | object | - | Pane style |

**Example**:

```vue
<n-tabs v-model:value="activeTab" type="line">
  <n-tab-pane name="tab1" tab="Tab 1">Content 1</n-tab-pane>
  <n-tab-pane name="tab2" tab="Tab 2">Content 2</n-tab-pane>
</n-tabs>
```

---

## Feedback Agents

### n-alert

**Description**: Displays important alert messages on the page.

**Use Cases**:

- System notifications
- Status messages
- Warning displays
- Important information

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | title | string | - | Alert title | | type | string | 'default' | Type: default, info, success, warning, error | | bordered | boolean | false | Show border | | closable | boolean | false | Can be dismissed | | show-icon | boolean | true | Show type icon |

**Example**:

```vue
<n-alert title="Success" type="success" closable>
  Operation completed successfully
</n-alert>
```

---

### n-badge

**Description**: Displays numbers or status marks on buttons and icons.

**Use Cases**:

- Notification counts
- Status indicators
- Unread message badges
- Attention markers

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | string/number | - | Display value | | max | number | - | Maximum value | | dot | boolean | false | Display as a dot | | type | string | 'error' | Badge type | | show | boolean | true | Show badge | | processing | boolean | false | Processing animation |

**Example**:

```vue
<n-badge :value="12" :max="99">
  <n-button>Messages</n-button>
</n-badge>
```

---

### n-dialog

**Description**: Modal dialog boxes.

**Use Cases**:

- Modal dialogs
- Form dialogs
- Confirmation dialogs

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | show | boolean | false | Dialog visibility | | title | string | - | Dialog title | | content | string | - | Dialog content | | type | string | - | Type: error, success, warning | | positive-text | string | - | Positive button text | | negative-text | string | - | Negative button text | | mask-closable | boolean | true | Close on mask click |

**Example**:

```vue
<n-dialog v-model:show="visible" title="Dialog Title">
  <p>Dialog content</p>
  <template #action>
    <n-button @click="visible = false">Close</n-button>
  </template>
</n-dialog>
```

---

### n-drawer

**Description**: Slide-out panel.

**Use Cases**:

- Slide-out panels
- Side panels
- Detail views

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | show | boolean | false | Drawer visibility | | width | string/number | - | Drawer width | | height | string/number | - | Drawer height | | placement | string | 'right' | Placement: top, right, bottom, left | | mask-closable | boolean | true | Close on mask click |

**Example**:

```vue
<n-drawer v-model:show="visible" placement="right" :width="400">
  <n-drawer-content title="Drawer Title">
    Drawer content
  </n-drawer-content>
</n-drawer>
```

---

### n-marquee

**Description**: Marquee text scrolling effect.

**Use Cases**:

- Announcements
- News tickers
- Scrolling text

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | auto-fill | boolean | true | Auto fill | | speed | number | 50 | Scroll speed | | direction | string | 'left' | Direction: left, right |

**Example**:

```vue
<n-marquee>
  Scrolling text content that will loop continuously
</n-marquee>
```

---

### n-message-provider

**Description**: Toast notification messages.

**Use Cases**:

- Toast notifications
- Operation feedback
- Status messages

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | max | number | - | Maximum messages | | keep-alive-on-hover | boolean | false | Keep alive on hover | | to | string | - | Mount target |

**Example**:

```vue
<template>
  <n-message-provider>
    <router-view />
  </n-message-provider>
</template>

<script setup>
import { useMessage } from 'naive-ui';
const message = useMessage();
message.success('Success!');
message.error('Error!');
</script>
```

---

### n-modal

**Description**: Modal component for custom content.

**Use Cases**:

- Custom modals
- Complex dialogs
- Form modals

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | show | boolean | false | Modal visibility | | preset | string | - | Preset: card, dialog | | title | string | - | Modal title | | mask-closable | boolean | true | Close on mask click | | close-on-esc | boolean | true | Close on ESC key | | transform-origin | string | 'mouse' | Transform origin |

**Example**:

```vue
<n-modal v-model:show="visible" preset="card" title="Modal Title">
  <p>Modal content</p>
</n-modal>
```

---

### n-notification-provider

**Description**: Corner notification popups.

**Use Cases**:

- Corner notifications
- System alerts
- Background notifications

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | max | number | - | Maximum notifications | | placement | string | 'top-right' | Position | | keep-alive-on-hover | boolean | false | Keep alive on hover | | to | string | - | Mount target |

**Example**:

```vue
<template>
  <n-notification-provider>
    <router-view />
  </n-notification-provider>
</template>

<script setup>
import { useNotification } from 'naive-ui';
const notification = useNotification();
notification.success({
  title: 'Success',
  content: 'Operation completed',
});
</script>
```

---

### n-popconfirm

**Description**: Simple confirmation dialogs.

**Use Cases**:

- Delete confirmations
- Action confirmations
- Quick confirm dialogs

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | positive-text | string | 'Confirm' | Positive button text | | negative-text | string | 'Cancel' | Negative button text | | on-positive-click | function | - | Positive click callback | | on-negative-click | function | - | Negative click callback |

**Example**:

```vue
<n-popconfirm @positive-click="handleDelete">
  <template #trigger>
    <n-button type="error">Delete</n-button>
  </template>
  Are you sure you want to delete this item?
</n-popconfirm>
```

---

### n-popover

**Description**: Rich content popups.

**Use Cases**:

- Rich popups
- Information cards
- Action menus

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | trigger | string | 'hover' | Trigger: hover, click, manual | | placement | string | 'top' | Placement position | | show | boolean | false | Visibility control | | width | number/string | - | Popover width | | raw | boolean | false | Raw content mode |

**Example**:

```vue
<n-popover trigger="hover" placement="bottom">
  <template #trigger>
    <n-button>Hover me</n-button>
  </template>
  Popover content
</n-popover>
```

---

### n-popselect

**Description**: Selection popover component.

**Use Cases**:

- Quick selections
- Dropdown selections
- Option pickers

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | value | any | - | Selected value | | options | array | - | Select options | | multiple | boolean | false | Multiple selection | | scrollable | boolean | false | Scrollable options |

**Example**:

```vue
<n-popselect v-model:value="value" :options="options">
  <n-button>{{ selectedLabel }}</n-button>
</n-popselect>
```

---

### n-progress

**Description**: Operation progress visualization.

**Use Cases**:

- Upload progress
- Task completion
- Loading states

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | percentage | number | 0 | Progress percentage | | type | string | 'line' | Type: line, circle, multiple-circle, dashboard | | status | string | - | Status: success, error, warning | | show-indicator | boolean | true | Show percentage | | height | number | - | Line height | | stroke-width | number | - | Circle stroke width |

**Example**:

```vue
<n-progress type="line" :percentage="50" />
<n-progress type="circle" :percentage="75" />
```

---

### n-result

**Description**: Operation result feedback.

**Use Cases**:

- Success pages
- Error pages
- Result displays

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | status | string | 'info' | Status: info, success, warning, error, 404, 403, 500 | | title | string | - | Result title | | description | string | - | Description |

**Example**:

```vue
<n-result status="success" title="Success" description="Operation completed">
  <template #footer>
    <n-button type="primary">Back</n-button>
  </template>
</n-result>
```

---

### n-skeleton

**Description**: Loading placeholders.

**Use Cases**:

- Loading states
- Content placeholders
- Improving perceived performance

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | text | boolean | false | Text skeleton | | width | string/number | - | Width | | height | string/number | - | Height | | repeat | number | 1 | Repeat count | | animated | boolean | true | Animation |

**Example**:

```vue
<n-skeleton text :repeat="3" />
<n-skeleton :width="200" :height="100" />
```

---

### n-spin

**Description**: Loading spinner component.

**Use Cases**:

- Loading states
- Async operation feedback
- Content loading

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | show | boolean | false | Show spinner | | size | string | 'medium' | Size: small, medium, large | | stroke-width | number | - | Stroke width | | description | string | - | Description text | | rotate | boolean | true | Rotate animation |

**Example**:

```vue
<n-spin :show="loading" description="Loading...">
  <div>Content</div>
</n-spin>
```

---

### n-tooltip

**Description**: Hover tooltip information.

**Use Cases**:

- Hover tooltips
- Help information
- Additional context

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | content | string | - | Tooltip content | | placement | string | 'top' | Placement position | | trigger | string | 'hover' | Trigger: hover, click, manual | | disabled | boolean | false | Disabled state | | show | boolean | false | Visibility control |

**Example**:

```vue
<n-tooltip placement="top">
  <template #trigger>
    <n-button>Hover me</n-button>
  </template>
  Tooltip text
</n-tooltip>
```

---

## Layout Agents

### n-flex

**Description**: Flexbox layout container.

**Use Cases**:

- Flexible layouts
- Responsive designs
- Flex containers

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | vertical | boolean | false | Vertical direction | | justify | string | 'start' | Justify content | | align | string | 'stretch' | Align items | | wrap | boolean | false | Flex wrap | | gap | string/number | - | Gap between items |

**Example**:

```vue
<n-flex justify="space-between" align="center" :gap="16">
  <div>Item 1</div>
  <div>Item 2</div>
</n-flex>
```

---

### n-grid

**Description**: Grid layout system.

**Use Cases**:

- Grid layouts
- Responsive columns
- Dashboard layouts

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | cols | number | 24 | Number of columns | | x-gap | number | 0 | Horizontal gap | | y-gap | number | 0 | Vertical gap | | responsive | string | 'self' | Responsive mode | | collapsed | boolean | false | Collapsed state | | collapsed-rows | number | - | Collapsed rows |

**Example**:

```vue
<n-grid :cols="24" :x-gap="16">
  <n-gi :span="12">Left</n-gi>
  <n-gi :span="12">Right</n-gi>
</n-grid>
```

---

### n-layout

**Description**: Layout containers (header, aside, main, footer).

**Use Cases**:

- Page layouts
- Application structure
- Responsive layouts

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | has-sider | boolean | false | Has sidebar | | position | string | 'static' | Position: static, absolute | | native-scrollbar | boolean | true | Native scrollbar |

**Sub-components**:

- n-layout-header
- n-layout-content
- n-layout-footer
- n-layout-sider

**Example**:

```vue
<n-layout has-sider>
  <n-layout-sider bordered>Aside</n-layout-sider>
  <n-layout>
    <n-layout-header>Header</n-layout-header>
    <n-layout-content>Content</n-layout-content>
    <n-layout-footer>Footer</n-layout-footer>
  </n-layout>
</n-layout>
```

---

### n-legacy-grid

**Description**: Legacy grid system for backward compatibility.

**Use Cases**:

- Legacy layouts
- Migration support
- Backward compatibility

**Example**:

```vue
<n-legacy-grid>
  <n-legacy-grid-item :span="12">Left</n-legacy-grid-item>
  <n-legacy-grid-item :span="12">Right</n-legacy-grid-item>
</n-legacy-grid>
```

---

### n-space

**Description**: Consistent spacing between elements.

**Use Cases**:

- Element spacing
- Button groups
- Form layouts

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | vertical | boolean | false | Vertical direction | | size | string/number/array | 'small' | Spacing size | | wrap | boolean | true | Auto wrapping | | justify | string | 'start' | Justify content | | align | string | 'center' | Align items | | item-style | object | - | Item style |

**Example**:

```vue
<n-space>
  <n-button>Button 1</n-button>
  <n-button>Button 2</n-button>
</n-space>
```

---

### n-split

**Description**: Resizable split panels.

**Use Cases**:

- Split views
- Resizable panels
- Multi-pane interfaces

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | direction | string | 'horizontal' | Direction: horizontal, vertical | | resize-trigger-size | number | 3 | Resize trigger size | | default-size | number | 0.5 | Default split size | | min | number | 0 | Minimum size | | max | number | 1 | Maximum size | | on-update:size | function | - | Size change callback |

**Example**:

```vue
<n-split direction="horizontal" :default-size="0.3">
  <template #1>
    Left panel
  </template>
  <template #2>
    Right panel
  </template>
</n-split>
```

---

## Utility Agents

### n-collapse-transition

**Description**: Collapse transition animation.

**Use Cases**:

- Collapse animations
- Expand/collapse effects
- Smooth transitions

**Example**:

```vue
<n-collapse-transition :show="visible">
  <div>Content to collapse</div>
</n-collapse-transition>
```

---

### n-discrete

**Description**: Discrete API for imperative component usage.

**Use Cases**:

- Imperative dialogs
- Programmatic notifications
- Dynamic component creation

**Example**:

```vue
<script setup>
import { createDiscreteApi, darkTheme } from 'naive-ui';

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: {
      theme: darkTheme,
    },
  },
);

message.success('Success!');
</script>
```

---

### n-scrollbar

**Description**: Custom scrollbar styling.

**Use Cases**:

- Custom scroll areas
- Infinite scrolling
- Scrollable containers

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | content-class | string | - | Content class | | content-style | object | - | Content style | | size | number | 5 | Scrollbar size | | always | boolean | false | Always show scrollbar | | x-scrollable | boolean | false | Horizontal scroll | | y-scrollable | boolean | true | Vertical scroll |

**Example**:

```vue
<n-scrollbar style="max-height: 400px">
  <p v-for="i in 100" :key="i">{{ i }}</p>
</n-scrollbar>
```

---

### n-virtual-list

**Description**: Virtual list for large datasets.

**Use Cases**:

- Large list rendering
- Performance optimization
- Infinite scroll lists

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | items | array | - | List items | | item-size | number/function | - | Item size | | item-resizable | boolean | false | Resizable items | | visible-items-tag | string | 'div' | Visible items tag | | on-scroll | function | - | Scroll callback |

**Example**:

```vue
<n-virtual-list :items="largeList" :item-size="50" item-resizable>
  <template #default="{ item }">
    <div>{{ item.content }}</div>
  </template>
</n-virtual-list>
```

---

## Config Agents

### n-config-provider

**Description**: Global configuration wrapper.

**Use Cases**:

- Global settings
- i18n configuration
- Theme configuration

**Parameters**: | Parameter | Type | Default | Description | |-----------|------|---------|-------------| | theme | object | - | Theme object (light/dark) | | theme-overrides | object | - | Theme overrides | | locale | object | - | Locale object | | date-locale | object | - | Date locale | | namespace | string | 'n' | CSS namespace | | tag | string | 'div' | Wrapper tag | | abstract | boolean | false | Abstract mode |

**Example**:

```vue
<n-config-provider :theme="darkTheme" :locale="zhCN">
  <App />
</n-config-provider>
```

---

### n-element

**Description**: Element component for accessing theme variables.

**Use Cases**:

- Theme variable access
- Style customization
- Theme-aware components

**Example**:

```vue
<n-element>
  <template #default="{ themeVars }">
    <div :style="{ color: themeVars.primaryColor }">
      Themed content
    </div>
  </template>
</n-element>
```

---

### n-global-style

**Description**: Global style application.

**Use Cases**:

- Global body styles
- Theme-aware global styles
- Font settings

**Example**:

```vue
<n-config-provider :theme="darkTheme">
  <n-global-style />
  <App />
</n-config-provider>
```

---

## Design Specifications Agents

### naive-ui-design-color

**Description**: Color palette and semantics specifications.

**Use Cases**:

- Understanding color system
- Applying brand colors
- Using semantic colors

**Key Colors**:

- Primary: #18a058
- Info: #2080f0
- Success: #18a058
- Warning: #f0a020
- Error: #d03050

**Key Variables**:

- `--n-color`: Base color
- `--n-color-hover`: Hover color
- `--n-color-pressed`: Pressed color
- `--n-text-color`: Text color

---

### naive-ui-design-border

**Description**: Border styles, radius, shadows specifications.

**Use Cases**:

- Understanding border styles
- Applying consistent radius
- Using shadow styles

**Key Variables**:

- `--n-border-radius`: 3px
- `--n-border`: 1px solid border color
- `--n-box-shadow`: Standard shadow

---

### naive-ui-design-typography

**Description**: Font conventions specifications.

**Use Cases**:

- Understanding font conventions
- Applying consistent text styles
- Managing font sizes

**Key Variables**:

- `--n-font-size`: 14px
- `--n-font-family`: System font stack
- `--n-line-height`: 1.6

---

### naive-ui-design-layout

**Description**: Layout system specifications.

**Use Cases**:

- Creating responsive layouts
- Building page structures
- Implementing grid-based designs

**Key Components**:

- n-grid
- n-flex
- n-layout
- Breakpoints: xs, sm, md, lg, xl, xxl

---

### naive-ui-design-overview

**Description**: Design system overview.

**Use Cases**:

- Quick component reference
- Understanding component categories
- Planning UI implementation

---

## Foundation Agents

### naive-ui-quickstart

**Description**: Installation and configuration guide.

**Use Cases**:

- Setting up Naive UI
- Configuring imports
- Initial project setup

---

### naive-ui-theming

**Description**: Theme customization guide.

**Use Cases**:

- Customizing themes
- Using CSS variables
- Theme overrides

---

### naive-ui-i18n

**Description**: Internationalization guide.

**Use Cases**:

- Multi-language support
- Locale configuration
- Language switching

---

### naive-ui-dark-mode

**Description**: Dark mode implementation guide.

**Use Cases**:

- Implementing dark mode
- Theme switching
- Dark mode styling

---

### naive-ui-ssr

**Description**: Server-side rendering guide.

**Use Cases**:

- SSR setup
- Nuxt.js integration
- SSR configuration

---

### naive-ui-components

**Description**: Component overview and navigation index.

**Use Cases**:

- Browse all components
- Find component categories
- Navigate to specific skills

---

## 📝 Usage Guidelines

### For AI Agents

1. **Identify User Intent**: Match user requirements to appropriate agent
2. **Check Prerequisites**: Verify required dependencies
3. **Follow Examples**: Use provided code examples as templates
4. **Apply Best Practices**: Follow recommended implementation guidelines

### Invocation Pattern

```
User Request → Agent Identification → Parameter Extraction → Example Application → Result
```

### Error Handling

When encountering errors:

1. Check parameter types and values
2. Verify component dependencies
3. Review best practices section
4. Consult related skills for context

---

## 🔗 Quick Reference

| Task               | Agent              |
| ------------------ | ------------------ |
| Create a form      | n-form             |
| Display data table | n-data-table       |
| Show notification  | n-message-provider |
| Create dialog      | n-dialog           |
| Add navigation     | n-menu             |
| Upload files       | n-upload           |
| Select date        | n-date-picker      |
| Show progress      | n-progress         |
| Create button      | n-button           |
| Display modal      | n-modal            |
| Add tooltip        | n-tooltip          |
| Create layout      | n-layout           |

---

## 📚 Additional Resources

- [Naive UI Documentation](https://www.naiveui.com/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Naive UI GitHub](https://github.com/tusen-projects/naive-ui)
- [Naive UI Theme Editor](https://www.naiveui.com/zh-CN/os-theme/docs/theme-editor)
