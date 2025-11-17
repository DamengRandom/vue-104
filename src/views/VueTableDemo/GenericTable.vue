
<script setup>
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/vue-table';
import { ref } from 'vue';

const props = defineProps({
  data: Array,
  columns: Array
});

const tableData = ref(props.data);
const tableColumns = ref(props.columns);
const sorting = ref([]);
const filterBy = ref('');

const pageSizes = [5, 10, 20, 50, 100];

const vueTable = useVueTable({
  data: tableData.value,
  columns: tableColumns.value,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  initialState: {
    pagination: {
      pageSize: pageSizes[1]
    }
  },
  state: {
    get sorting() {
      return sorting.value  
    },
    get globalFilter() {
      return filterBy.value.trim()
    }
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue; 
  }
});
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="my-4">
            <label>Filter: </label>
            <input
              v-model="filterBy"
              type="text"
              class="px-2 py-2 border border-gray-300 rounded"
              placeholder="Filter by full name, email, title, or role"
              @input="vueTable.setGlobalFilter($event.target.value.trim())"
            >
          </div>
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr
                v-for="headerGroup in vueTable.getHeaderGroups()"
                :key="headerGroup.id"
              >
                <th
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  scope="col"
                  :class="{ 'cursor-pointer select-none': header.column.getCanSort() }"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  @click="header.column.getToggleSortingHandler()?.($event)"
                >
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                  {{
                    {
                      asc: '↑',
                      desc: '↓',
                    }[header.column.getIsSorted()] || ''
                  }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="row in vueTable.getRowModel().rows"
                :key="row.id"
              >
                <td
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex items-center space-x-4 mt-8">
        <button
          class="border border-gray-300 rounded p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="vueTable.setPageIndex(0)"
        >
          First Page
        </button>
        <button
          class="border border-gray-300 rounded p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!vueTable.getCanPreviousPage()"
          @click="vueTable.previousPage()"
        >
          Prev Page
        </button>
        <div>
          Page {{ vueTable.getState().pagination.pageIndex + 1 }} of {{ vueTable.getPageCount() }} 
          - {{ vueTable.getFilteredRowModel().rows.length }} results
        </div>
        <label
          for="page-size"
          class="text-sm text-gray-600"
        >Rows per page</label>
        <select
          id="page-size"
          :value="vueTable.getState().pagination.pageSize"
          class="border border-gray-300 rounded-md bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          aria-label="Rows per page"
          title="Rows per page"
          @change="vueTable.setPageSize(Number($event.target.value))"
        >
          <option
            v-for="pageSize of pageSizes"
            :key="pageSize"
            :value="pageSize"
          >
            {{ pageSize }}
          </option>
        </select>
        <button
          class="border border-gray-300 rounded p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!vueTable.getCanNextPage()"
          @click="vueTable.nextPage()"
        >
          Next Page
        </button>
        <button
          class="border border-gray-300 rounded p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="vueTable.setPageIndex(vueTable.getPageCount() - 1)"
        >
          Last Page
        </button>
      </div>
    </div>
  </div>
</template>
