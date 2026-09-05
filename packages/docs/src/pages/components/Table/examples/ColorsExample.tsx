import {Table, TableBody, TableCell, TableHead, TableRow} from '@loreschaeffer/lyco-ui';

export const title = 'Color Variants';
export const description = (
    <p>
        Use the <code>variant</code> prop on the <code>Table</code>, <code>TableRow</code>, or <code>TableCell</code> components to apply contextual colors.
    </p>
);
export const order = 3;

export const vanillaHtml = `
<div class="table-wrapper">
  <div class="table-responsive">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Class</th>
                <th scope="col">Heading</th>
                <th scope="col">Heading</th>
            </tr>
        </thead>
        <tbody>
            <tr class="table-primary">
                <td>Primary</td>
                <td>Cell</td>
                <td>Cell</td>
            </tr>
            <tr class="table-success">
                <td>Success</td>
                <td>Cell</td>
                <td>Cell</td>
            </tr>
            <tr class="table-danger">
                <td>Danger</td>
                <td>Cell</td>
                <td>Cell</td>
            </tr>
            <tr class="table-warning">
                <td>Warning</td>
                <td>Cell</td>
                <td>Cell</td>
            </tr>
            <tr class="table-info">
                <td>Info</td>
                <td>Cell</td>
                <td>Cell</td>
            </tr>
            <tr>
                <td>Mixed</td>
                <td class="table-success">Success Cell</td>
                <td class="table-danger">Danger Cell</td>
            </tr>
        </tbody>
    </table>
  </div>
</div>
`;

export default function ColorsExample() {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell isHeader>Class</TableCell>
                    <TableCell isHeader>Heading</TableCell>
                    <TableCell isHeader>Heading</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow variant="primary">
                    <TableCell>Primary</TableCell>
                    <TableCell>Cell</TableCell>
                    <TableCell>Cell</TableCell>
                </TableRow>
                <TableRow variant="success">
                    <TableCell>Success</TableCell>
                    <TableCell>Cell</TableCell>
                    <TableCell>Cell</TableCell>
                </TableRow>
                <TableRow variant="danger">
                    <TableCell>Danger</TableCell>
                    <TableCell>Cell</TableCell>
                    <TableCell>Cell</TableCell>
                </TableRow>
                <TableRow variant="warning">
                    <TableCell>Warning</TableCell>
                    <TableCell>Cell</TableCell>
                    <TableCell>Cell</TableCell>
                </TableRow>
                <TableRow variant="info">
                    <TableCell>Info</TableCell>
                    <TableCell>Cell</TableCell>
                    <TableCell>Cell</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Mixed</TableCell>
                    <TableCell variant="success">Success Cell</TableCell>
                    <TableCell variant="danger">Danger Cell</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
