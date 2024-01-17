// import React from 'react'

// const GenericTable = (columns,
//     data,
//     isGlobalFilter,
//     isJobListGlobalFilter,
//     isAddOptions,
//     isAddUserList,
//     isAddFacility,
//     handleOrderClicks,
//     handleUserClick,
//     handleCustomerClick,
//     handleFacilityClick,
//     isAddCustList,
//     customPageSize,
//     className,
//     customPageSizeOptions,
//     label,) => {
//         const {
//           getTableProps,
//           getTableBodyProps,
//           headerGroups,
//           page,
//           prepareRow,
//           canPreviousPage,
//           canNextPage,
//           pageOptions,
//           pageCount,
//           gotoPage,
//           nextPage,
//           previousPage,
//           setPageSize,
//           state,
//           preGlobalFilteredRows,
//           setGlobalFilter,
//           state: { pageIndex, pageSize },
//         } = useTable(
//           {
//             columns,
//             data,
//             defaultColumn: { Filter: DefaultColumnFilter },
//             initialState: {
//               pageIndex: 0,
//               pageSize: customPageSize,
//               sortBy: [
//                 {
//                   desc: false,
//                 },
//               ],
//             },
//           },
//           useGlobalFilter,
//           useFilters,
//           useSortBy,
//           useExpanded,
//           usePagination
//         );
      
//         const generateSortingIndicator = (column) => {
//           return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : " 🔼";
//         };
      
//         const onChangeInSelect = (event) => {
//           setPageSize(Number(event.target.value));
//         };
      
//         const onChangeInInput = (event) => {
//           const page = event.target.value ? Number(event.target.value) - 1 : 0;
//           gotoPage(page);
//         };
       
      
//         return (
//           <Fragment>
            
//             <Row className="align-items-center  d-flex mb-3 rounded bg-subbar border border-info ">
//               <Col md={customPageSizeOptions ? 2 : 1}>
//                 <select
//                   className="form-select"
//                   value={pageSize}
//                   onChange={onChangeInSelect}
//                 >
//                   {[5, 10, 20, 30, 40, 50].map((pageSize) => (
//                     <option key={pageSize} value={pageSize}>
//                        Row {pageSize}
//                     </option>
//                   ))}
//                 </select>
//               </Col>  
      
//               {isGlobalFilter && (
//                 <GlobalFilter
//                   preGlobalFilteredRows={preGlobalFilteredRows}
//                   globalFilter={state.globalFilter}
//                   setGlobalFilter={setGlobalFilter}
//                   isJobListGlobalFilter={isJobListGlobalFilter}
//                 />
//               )}
//               {isAddOptions && (
//                 <Col sm="7">
//                   <div className="text-sm-end">
//                     <Button
//                       type="button"
//                       color="success"
//                       className="btn-rounded  mb-2 me-2"
//                       onClick={handleOrderClicks}
//                     >
//                       <i className="mdi mdi-plus me-1" />
//                       Add New Order
//                     </Button>
//                   </div>
//                 </Col>
//               )}
//               {isAddUserList && (
//                 <Col sm="7">
//                   <div className="text-sm-end">
//                     <Button
//                       type="button"
//                       color="primary"
//                       className="btn mb-2 me-2"
//                       onClick={handleUserClick}
//                     >
//                       <i className="mdi mdi-plus-circle-outline me-1" />
//                       Create New User
//                     </Button>
//                   </div>
//                 </Col>
//               )}
//               {isAddCustList && (
//                 <Col sm="7">
//                   <div className="text-sm-end">
//                     <Button
//                       type="button"
//                       color="success"
//                       className="btn-rounded mb-2 me-2"
//                       onClick={handleCustomerClick}
//                     >
//                       <i className="mdi mdi-plus me-1" />
//                       New Customers
//                     </Button>
//                   </div>
//                 </Col>
//               )}
//                {isAddFacility && (
//                 <Col sm="6">
//                   <div className="text-sm-end mt-2">
//                     <Button
//                       type="button"
//                       color="primary"
//                       className="btn mb-2 me-2 "
//                       onClick={handleFacilityClick}
//                     >
//                       <i className="mdi mdi-plus-circle-outline me-1" />
//                       {label}
//                       {/* Create New Facility */}
//                     </Button>
//                   </div>
//                 </Col>
//               )}
//             </Row>
      
//              {/* table */}
//             <div className="table-responsive react-table">
//               <Table bordered hover {...getTableProps()} className={className}>
//                 <thead className="table-light table-nowrap">
//                   {headerGroups.map((headerGroup) => (
//                     <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
//                       {headerGroup.headers.map((column) => (
//                         <th key={column.id} >
//                           <div className="mb-2" {...column.getSortByToggleProps()}>
//                             {column.render("Header")}
//                             {generateSortingIndicator(column)}
//                           </div>
//                           <Filter column={column} />
//                         </th>
//                       ))}
//                     </tr>
//                   ))}
//                 </thead>
      
//                 <tbody {...getTableBodyProps()}>
//                   {page.map((row) => {
//                     prepareRow(row);
//                     return (
//                       <Fragment key={row.getRowProps().key}>
//                         <tr>
//                           {row.cells.map((cell) => {
//                             return (
//                               <td key={cell.id} {...cell.getCellProps()}>
//                                 {cell.render("Cell")}
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       </Fragment>
//                     );
//                   })}
//                 </tbody>
//               </Table>
//             </div>
      
//             <Row className="justify-content-md-end justify-content-center align-items-center">
      
        
//               <Col className="col-md-auto">
//                 <div className="d-flex gap-1">
//                   <Button
//                     color="primary"
//                     onClick={() => gotoPage(0)}
//                     disabled={!canPreviousPage}
//                   >
//                     {"<<"}
//                   </Button>
//                   <Button
//                     color="primary"
//                     onClick={previousPage}
//                     disabled={!canPreviousPage}
//                   >
//                     {"<"}
//                   </Button>
//                 </div>
//               </Col>
//               <Col className="col-md-auto d-none d-md-block">
//                 Page{" "}
//                 <strong>
//                   {pageIndex + 1} of {pageOptions.length}
//                 </strong>
//               </Col>
//               <Col className="col-md-auto">
//                 <Input
//                   type="number"
//                   min={1}
//                   style={{ width: 70 }}
//                   max={pageOptions.length}
//                   defaultValue={pageIndex + 1}
//                   onChange={onChangeInInput}
//                 />
//               </Col>
      
//               <Col className="col-md-auto">
//                 <div className="d-flex gap-1">
//                   <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
//                     {">"}
//                   </Button>
//                   <Button
//                     color="primary"
//                     onClick={() => gotoPage(pageCount - 1)}
//                     disabled={!canNextPage}
//                   >
//                     {">>"}
//                   </Button>
//                 </div>
//               </Col>
//             </Row>
//           </Fragment>
//         );
// }

// export default GenericTable