import React, { useEffect } from 'react';
import usePresentationStore from "../store/presentationStore";
import fetchPresentations from "../services/presentationService";
import { Link } from 'react-router-dom';
import { DataTable, TableHead, TableBody, TableRow, TableCell } from '@shadcn/ui';

const Dashboard: React.FC = () => {
  const { presentations, fetchPresentations } = usePresentationStore();

  useEffect(() => {
    fetchPresentations();
  }, [fetchPresentations]);

  return (
    <div>
      <h1>Presentations Dashboard</h1>
      <DataTable>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Authors</TableCell>
            <TableCell>Date of Publishment</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {presentations.map((presentation) => (
            <TableRow key={presentation.title}>
              <TableCell>{presentation.title}</TableCell>
              <TableCell>{presentation.authors.join(', ')}</TableCell>
              <TableCell>{new Date(presentation.dateOfPublishment).toLocaleDateString()}</TableCell>
              <TableCell>
                <Link to={`/presentation/${presentation.title}`}>View</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </div>
  );
};

export default Dashboard;
