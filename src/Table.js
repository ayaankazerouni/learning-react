import React from 'react';

const Table = props => {
  const { peopleData, removePerson } = props;

  return (
    <table>
      <TableHeader />
      <TableBody peopleData={peopleData} removePerson={removePerson}/>
    </table>
  );
}

const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
    );
  }

const TableBody = props => {
    const rows = props.peopleData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row._id}</td>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td> 
                    <button onClick={() => props.removePerson(row._id)}>Delete</button>
                </td>
            </tr>
        );
    });
    return <tbody>{rows}</tbody>;
}

export default Table;
