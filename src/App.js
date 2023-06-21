import { DataGrid } from "@mui/x-data-grid";
function App() {
  const createData = (id, title, description, price) => {
    return {
      id,
      title,
      description,
      price,
    };
  };
  const rows = [
    createData("1", "Lenovo", "Russian company", "$" + 150),
    createData("2", "Lenovo1", "Russian company1", "$" + 151),
    createData("3", "Lenovo2", "Russian company2", "$" + 152),
    createData("4", "Lenovo3", "Russian company3", "$" + 153),
    createData("5", "Lenovo4", "Russian company4", "$" + 154),
    createData("6", "Lenovo5", "Russian company5", "$" + 155),
  ];
  const columns = [
    {
      field: "id",
      numeric: false,
      disablePadding: true,
      width: 50,
    },
    {
      field: "title",
      numeric: false,
      disablePadding: true,
      width: 90,
    },
    {
      field: "description",
      numeric: false,
      disablePadding: true,
      width: 150,
    },
    {
      field: "price",
      numeric: false,
      disablePadding: true,
      width: 100,
    },
  ];

  return (
    <div className="App">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}

export default App;
// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];
