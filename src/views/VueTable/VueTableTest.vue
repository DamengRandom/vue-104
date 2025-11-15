
<script setup>
import people from '@/assets/mocks/people.json';
import { useVueTable, FlexRender, getCoreRowModel } from '@tanstack/vue-table';
import { ref, h } from 'vue';
import { format } from 'date-fns';
import EditButton from '@/views/VueTable/EditButton.vue';

const peopleData = ref(people);

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
    "header": "ID"
  },
  {
    "accessorKey": "first_name",
    "header": "First Name"
  },
  {
    "accessorKey": "last_name",
    "header": "Last Name"
  },
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
    "cell": (row) => h(EditButton, { onClick: () => {
      console.log('Edit', row.row.getAllCells().map(cell => cell.getValue()));
    }})
  },
]; // this is the array of column headers

const vueTable = useVueTable({
  data: peopleData.value,
  columns: columnsPeople,
  getCoreRowModel: getCoreRowModel(),
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
              <tr v-for="headerGroup in vueTable.getHeaderGroups()" :key="headerGroup.id">
                <th v-for="header in headerGroup.headers"
                  :key="header.id"
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="row in vueTable.getRowModel().rows" :key="row.id">
                <td v-for="cell in row.getVisibleCells()"
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  :key="cell.id"
                >
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
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
    </div>
  </div>
</template>
