import { Table, TableHead, TableBody, TableRow, TableCell } from 'lyco-ui';

export const title = 'Standard Table';
export const description = (
    <p>
        The standard table includes options for zebra striping, hover effects, and responsive wrapping.
    </p>
);
export const order = 1;

export const vanillaHtml = `
<div class="table-responsive">
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
            </tr>
        </tbody>
    </table>
</div>
`;

export default function StandardExample() {
    return (
        <Table responsive striped hover>
            <TableHead>
                <TableRow>
                    <TableCell isHeader>#</TableCell>
                    <TableCell isHeader>First Name</TableCell>
                    <TableCell isHeader>Last Name</TableCell>
                    <TableCell isHeader>Username</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Mark</TableCell>
                    <TableCell>Otto</TableCell>
                    <TableCell>@mdo</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Jacob</TableCell>
                    <TableCell>Thornton</TableCell>
                    <TableCell>@fat</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>Larry</TableCell>
                    <TableCell>the Bird</TableCell>
                    <TableCell>@twitter</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
