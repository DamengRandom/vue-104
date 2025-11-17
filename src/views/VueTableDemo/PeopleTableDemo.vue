<script setup>
import { h } from 'vue';
import { format } from 'date-fns';
import people from '@/assets/mocks/people.json';
import GenericTable from '@/views/VueTableDemo/GenericTable.vue';
import EditButton from '@/views/VueTableDemo/EditButton.vue';
// We could define different data for generic table component, so powerful !!!!
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

</script>
<template>
  <GenericTable
    :data="people"
    :columns="columnsPeople"
  />
</template>
