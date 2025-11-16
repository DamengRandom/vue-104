<template>
  <el-menu
    mode="horizontal"
    :default-active="selectedIndex"
    active-text-color="lime"
    @select="selected"
  >
    <el-menu-item index="1">
      My Element Plus Study ~
    </el-menu-item>
    <el-sub-menu
      index="2"
      :class="{ 'active-tab': isSubTabActive }"
    >
      <template #title>
        Elements Tab {{ isSubTabActive ? selectedIndex : '' }}
      </template>
      <el-menu-item index="2-1">
        Option 1
      </el-menu-item>
      <el-menu-item index="2-2">
        Option 2
      </el-menu-item>
      <el-menu-item index="2-3">
        Option 3
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">
      Menu item 3
    </el-menu-item>
    <el-menu-item index="4">
      Menu item 4
    </el-menu-item>
  </el-menu>
  <h3 class="section">
    Demo for Breadcrumb
  </h3>
  <el-breadcrumb>
    <el-breadcrumb-item>Home</el-breadcrumb-item>
    <el-breadcrumb-item>Elements Tab</el-breadcrumb-item>
    <el-breadcrumb-item>Option 2</el-breadcrumb-item>
  </el-breadcrumb>
  <h3 class="section">
    Demo for Dropdown
  </h3>
  <el-dropdown @command="userCommand">
    <span>User Profile <el-icon><i-ep-User /></el-icon></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="settings">
          Settings
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          Logout
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <h3 class="section">
    Demo for Tabs
  </h3>
  <el-button @click="addNewTab">
    Add Tab
  </el-button>
  <el-tabs
    v-if="reactiveTabs.arrTabs.length"
    v-model="selectedTabName"
    closable
    type="card"
    @tab-remove="removeTab"
    @tab-click="tabClick"
  >
    <el-tab-pane 
      v-for="tab in reactiveTabs.arrTabs"
      :key="tab.name" 
      :name="tab.name" 
      :label="tab.label"
    >
      {{ tab.content }}
    </el-tab-pane>
  </el-tabs>
  <h3 class="section">
    Demo for Buttons
  </h3>
  <el-button @click="openMsg">
    Open Message
  </el-button>
  <el-button @click="openConfirm">
    Confirm to delete
  </el-button>
  <el-button @click="openNotification">
    Open Notification
  </el-button>
  <h3 class="section">
    Demo for Inputs - Radios
  </h3>
  <div>
    <h4>Single radio select</h4>
    <el-radio
      v-model="radio"
      value="1"
    >
      Frontend
    </el-radio>
    <el-radio
      v-model="radio"
      value="2"
    >
      Backend
    </el-radio>
    <el-radio
      v-model="radio"
      value="3"
    >
      Fullstack
    </el-radio>
  </div>
  <div>
    <h4>Single radio select - event binding</h4>
    <el-radio
      v-model="radio2"
      value="a"
      @change="radioChange"
    >
      Frontend
    </el-radio>
    <el-radio
      v-model="radio2"
      value="b"
      @change="radioChange"
    >
      Backend
    </el-radio>
    <el-radio
      v-model="radio2"
      value="c"
      @change="radioChange"
    >
      Fullstack
    </el-radio>
  </div>
  <div>
    <h4>Single radio select - radio group + event binding (recommand ~)</h4>
    <el-radio-group
      v-model="radio3"
      @change="radioGroupChange"
    >
      <el-radio value="a">
        Frontend
      </el-radio>
      <el-radio value="b">
        Backend
      </el-radio>
      <el-radio value="c">
        Fullstack
      </el-radio>
    </el-radio-group>
  </div>
  <div>
    <h4>Checkbox multi-select - checkbox group</h4>
    <el-checkbox-group v-model="checked">
      <el-checkbox value="1">
        Frontend
      </el-checkbox>
      <el-checkbox value="2">
        Backend
      </el-checkbox>
      <el-checkbox value="3">
        Fullstack
      </el-checkbox>
    </el-checkbox-group>
  </div>
  <div>
    <h4>Checkbox multi-select - checkbox group + event binding (recommand ~)</h4>
    <el-checkbox-group
      v-model="checked2"
      @change="checkboxGroupChange"
    >
      <el-checkbox value="1">
        Frontend
      </el-checkbox>
      <el-checkbox value="2">
        Backend
      </el-checkbox>
      <el-checkbox value="3">
        Fullstack
      </el-checkbox>
    </el-checkbox-group>
  </div>
  <h3 class="section">
    Demo for Dropdown Select
  </h3>
  <div>
    <h4>Dropdown select</h4>
    <el-select
      v-model="dropdownSelected"
      placeholder="Please select"
    >
      <el-option
        label="Frontend"
        value="1"
      />
      <el-option
        label="Backend"
        value="2"
      />
      <el-option
        label="Fullstack"
        value="3"
      />
    </el-select>
  </div>
  <div>
    <h4>Dropdown select - event binding</h4>
    <el-select
      v-model="dropdownSelected2"
      placeholder="Please select"
      @change="selectChange"
    >
      <el-option
        label="Frontend"
        value="a"
      />
      <el-option
        label="Backend"
        value="b"
      />
      <el-option
        label="Fullstack"
        value="c"
      />
    </el-select>
  </div>
  <div>
    <h4>Dropdown select - dynamic options loading + event binding (recommand ~)</h4>
    <el-select
      v-model="dropdownSelected3"
      placeholder="Please select"
      @change="selectChange"
    >
      <el-option
        v-for="option in selectOptions.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </div>
  <div>
    <h4>Dropdown multi-select - dynamic options loading + event binding (recommand ~)</h4>
    <el-select
      v-model="dropdownSelected4"
      multiple
      placeholder="Please select"
      @change="selectChange"
    >
      <el-option
        v-for="option in selectOptions.multiSelectOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </div>
  <h3 class="section">
    Demo for DatePicker
  </h3>
  <div>
    <h4>DatePicker</h4>
    <el-date-picker
      v-model="date"
      type="datetime"
      value-format="YYYY-MM-DD HH:mm:ss"
      placeholder="Choose a date"
      @change="datechange"
    />
  </div>
  <h3 class="section">
    Demo for Form + dialog modal view
  </h3>
  <div>
    <h4>Form with items + dialog modal view</h4>
    <el-button @click="dialog = true">
      Open Dialog
    </el-button>
    <el-dialog
      v-model="dialog"
      width="600"
      title="From Dialog"
      draggable
      @close="dialogClose"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
      >
        <el-form-item
          label="Text"
          prop="text"
        >
          <el-input
            v-model="form.text"
            placeholder="Enter text content"
          />
        </el-form-item>
        <el-form-item
          label="Occupation Selector"
          prop="occupation"
        >
          <el-radio-group v-model="form.occupation">
            <el-radio value="1">
              Frontend
            </el-radio>
            <el-radio value="2">
              Backend
            </el-radio>
            <el-radio value="3">
              Fullstack
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="Date Selector"
          prop="date"
        >
          <el-date-picker
            v-model="form.date"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="Choose a date"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="addFormData(formRef)"
          >
            Add Form Data
          </el-button>
          <el-button @click="resetForm(formRef)">
            Reset Form
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  <h3 class="section">
    Demo for Pagination
  </h3>
  <div>
    <h4>Pagination</h4>
    <el-pagination
      layout="prev, pager, next, jumper, total"
      :page-size="5"
      :total="50"
      background
      @current-change="currentPageChange"
    />
  </div>
  <h3 class="section">
    Demo for Table
  </h3>
  <div>
    <h4>Table view</h4>
    <el-table
      :data="table.arrData"
      border
    >
      <el-table-column type="selection" />
      <el-table-column
        label="ID"
        prop="id"
      />
      <el-table-column
        label="Name"
        prop="name"
      />
      <el-table-column
        label="Web"
        prop="web"
      />
      <el-table-column
        label="Date"
        prop="date"
      />
    </el-table>
  </div>
  <br>
</template>
<script lang="ts" setup>
  import { CheckboxValueType, FormInstance, FormRules, TabPaneName, TabsPaneContext, ElMessage, ElMessageBox, ElNotification } from 'element-plus';
  import { computed, reactive, ref } from 'vue';
  // We use dynamic import - unplugins, so we don't need these imports
  // import type { ElMessage, ElMessageBox, ElNotification, FormInstance, FormRules } from 'element-plus';
  // All Element Plus types are now globally available via auto-imports
  
  // Demo for Menu
  const selectedIndex= ref('2-2');

  const selected = (index: string, indexPath: string[]) => {
    // console.log("index: ", index, "indexPath: ", indexPath);
    selectedIndex.value = index;
  }

  const isSubTabActive = computed(() => {
    return selectedIndex.value.includes("-");
  });
  
  // Demo for Buttons
  const openMsg = () => {
    ElMessage({
      type: 'success',
      message: 'damon.com',
      showClose: true
    });
  }

  const openConfirm = () => {
    ElMessageBox.confirm('Confirm to delete?', 'Delete message', {
      type: 'warning',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete success',
      });
    }).catch(() => {
      console.log('Maybe trigger some cancellation events');
    });
  }

  const openNotification = () => {
    ElNotification({
      type: 'success',
      title: 'User record for saving',
      message: 'User record has been saved successfully',
      duration: 1200,
      position: 'top-right'
    });
  }
  
  // Demo for Dropdown
  const userCommand = (command: string) => {
    console.log("command: ", command);
  }
  
  // Demo for Tabs
  const selectedTabName = ref('tab1');

  const tabClick = (tab: TabsPaneContext, event: Event) => {
    console.log("tab: ", tab, "event: ", event);
  }

  const reactiveTabs = reactive({
    arrTabs: [
      {
        name: 'tab1',
        label: 'Tab 1',
        content: 'Tab 1 Content'
      },
      {
        name: 'tab2',
        label: 'Tab 2',
        content: 'Tab 2 Content'
      },
      {
        name: 'tab3',
        label: 'Tab 3',
        content: 'Tab 3 Content'
      }
    ]
  });

  const addNewTab = () => {
    let index = reactiveTabs.arrTabs.length;
    index++;

    reactiveTabs.arrTabs.push({
      name: 'tab' + index,
      label: 'Tab ' + index,
      content: 'Tab ' + index + ' Content'
    })
  }

  const removeTab = (name: TabPaneName) => {
    console.log('Tab name: ', name);

    // const index = reactiveTabs.arrTabs.filter(tab => tab.name !== name);
    const index = reactiveTabs.arrTabs.findIndex(tab => tab.name === name);

    reactiveTabs.arrTabs.splice(index, 1);
  }
  
  // Demo for inputs - Radios
  const radio = ref("3");
  const radio2 = ref("b");
  const radio3 = ref("a");

  const radioChange = (val: string | number | boolean | undefined) => {
    console.log("Readio Changes: ", val);
  }

  const radioGroupChange = (val: string | number | boolean | undefined) => {
    console.log("Readio Group Changes: ", val);
  }

  const checked = ref(["1", "2"]);

  const checked2 = ref([]);

  const checkboxGroupChange = (val: CheckboxValueType[]) => {
    console.log("Checkbox Group Changes: ", val);
  }

  // Demo for Dropdown select
  const dropdownSelected = ref('2');
  const dropdownSelected2 = ref('a');
  const dropdownSelected3 = ref('C');
  const dropdownSelected4 = ref(['1', '3']);

  const selectOptions = reactive({
    options: [
      { value: 'A', label: 'Frontend' },
      { value: 'B', label: 'Backend' },
      { value: 'C', label: 'Fullstack' }
    ],
    multiSelectOptions: [
      { value: '1', label: 'Frontend' },
      { value: '2', label: 'Backend' },
      { value: '3', label: 'Fullstack' }
    ]
  });

  const selectChange = (val: string | string[]) => {
    console.log("Select change: ", val);
  }
  
  // Demo for Datepicker
  const date = ref();
  const datechange = (val: string | Date) => {
    console.log("Date value: ", val);
  }
  const dialog = ref(false);

  // Demo for Form data
  interface FormProps {
    text: string;
    occupation: string;
    date: string;
  }
  const formRef = ref<FormInstance>();
  const form = reactive<FormProps>({
    text: '',
    occupation: '',
    date: ''
  });
  const formRules = reactive<FormRules<FormProps>>({
    text: [
      { required: true, message: 'Please input text', trigger: 'blur' }
    ],
    occupation: [
      { required: true, message: 'Please select occupation', trigger: 'change' }
    ],
    date: [
      { required: true, message: 'Please select date', trigger: 'change' }
    ]
  });

  const getFormValues = () => {
    return {
      text: form.text,
      occupation: form.occupation,
      date: form.date
    };
  }

  const addFormData = async (formEl: FormInstance | undefined) => {
    console.log("Data - try for submission: ", getFormValues())
    if (!formEl) return ;
    await formEl.validate(async (valid: boolean, fields: Record<string, any> | undefined) => {
      if (valid) console.log('😇😇😇😇😇, trigger another API call for sumission');
      else console.log('😔😔😔😔😔', fields);
    });
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return ;
    formEl.resetFields();
  }

  const dialogClose = () => {
    console.log("Close dialog now ~");
  }

  // Demo for pagination
  const currentPageChange = (val: number) => {
    console.log("Current page: ", val);
  }

  // Demo for table
  const table = reactive({
    arrData: [
      {
        id: 1,
        name: 'Damon',
        web: 'https://www.damonwu.com',
        date: '2025-01-01'
      },
      {
        id: 2,
        name: 'Damon 2',
        web: 'https://www.damonwu.com',
        date: '2025-01-01'
      }
    ]
  });
</script>
<style scoped>
  .section {
    margin: 1rem 0;
    color: chocolate;
  }

  .active-tab {
    background-color: orange;
  }
</style>