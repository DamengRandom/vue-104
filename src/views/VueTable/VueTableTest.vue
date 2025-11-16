
<script setup>
import people from '@/assets/mocks/people.json';
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/vue-table';
import { ref, h } from 'vue';
import { format } from 'date-fns';
import EditButton from '@/views/VueTable/EditButton.vue';

const peopleData = ref(people);
const sorting = ref([]);

const pageSizes = [5, 10, 20, 50, 100];

const columnsPeople = [
  // {
  //   "id": 1,
  //   "first_name": "Leone",
  //   "last_name": "Sinclair",
  //   "email": "lsinclair0@mayoclinic.com",
  //   "title": "Systems Administrator I",
  //   "role": "Subcontractor",
  //   "created_at": "2022-11-04T13:02:17Z"
  // }
  {
    "accessorKey": "id",
    "header": "ID",
    "enableSorting": false,
  },
  // {
  //   "accessorKey": "first_name",
  //   "header": "First Name"
  // },
  // {
  //   "accessorKey": "last_name",
  //   "header": "Last Name"
  // },
  {
    "id": "full_name",
    "accessorFn": (row) => `${row.first_name} ${row.last_name}`, // Please using accessorFn
    "header": "Full Name"
  },
  {
    "accessorKey": "email",
    "header": "Email"
  },
  {
    "accessorKey": "title",
    "header": "Title"
  },
  {
    "accessorKey": "role",
    "header": "Role"
  },
  {
    "accessorKey": "created_at",
    "header": "Created At",
    "cell": (createdAt) => format(new Date(createdAt.getValue()), 'MMM d, yyyy')
  },
  {
    "accessorKey": "edit",
    "header": "",
    "enableSorting": false,
    // "cell": (cellData) => h(EditButton, { onClick: () => {
    //   console.log('Edit', cellData.row.getAllCells().map(cell => cell.getValue()));
    // }})
    "cell": ({ row }) => h(EditButton, { id: row.original.id })
  },
]; // this is the array of column headers

const vueTable = useVueTable({
  data: peopleData.value,
  columns: columnsPeople,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  initialState: {
    pagination: {
      pageSize: pageSizes[1]
    }
  },
  state: {
    get sorting() {
      return sorting.value  
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
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <!-- <tr>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  First name
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Last name
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Title
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Role
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Edit</span>
                </th>
              </tr> -->
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
              <!-- <tr v-for="person in people" :key="person.id">
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ person.first_name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ person.last_name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ person.email }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ person.title }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ person.role }}
                </td>
                <td
                  class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Edit<span class="sr-only">, {{ person.name }}</span></a
                  >
                </td>
              </tr> -->
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
