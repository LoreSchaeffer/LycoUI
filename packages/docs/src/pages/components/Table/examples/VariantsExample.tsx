import { Table, TableHead, TableBody, TableRow, TableCell } from '@loreschaeffer/lyco-ui';

export const title = 'Table Variants';
export const description = (
    <p>
        Use the <code>bordered</code>, <code>borderless</code>, and <code>size="sm"</code> props to change the structural appearance of the table.
    </p>
);
export const order = 2;

export const vanillaHtml = `
<!-- Bordered Table -->
<div class="table-wrapper">
  <div class="table-responsive">
    <table class="table table-bordered mb-4">
        <thead>
            <tr><th scope="col">#</th><th scope="col">First Name</th><th scope="col">Last Name</th></tr>
        </thead>
        <tbody>
            <tr><td>1</td><td>Mark</td><td>Otto</td></tr>
        </tbody>
    </table>
  </div>
</div>

<!-- Borderless Table -->
<div class="table-wrapper">
  <div class="table-responsive">
    <table class="table table-borderless mb-4">
        <thead>
            <tr><th scope="col">#</th><th scope="col">First Name</th><th scope="col">Last Name</th></tr>
        </thead>
        <tbody>
            <tr><td>1</td><td>Mark</td><td>Otto</td></tr>
        </tbody>
    </table>
  </div>
</div>

<!-- Small Table -->
<div class="table-wrapper">
  <div class="table-responsive">
    <table class="table table-sm">
        <thead>
            <tr><th scope="col">#</th><th scope="col">First Name</th><th scope="col">Last Name</th></tr>
        </thead>
        <tbody>
            <tr><td>1</td><td>Mark</td><td>Otto</td></tr>
        </tbody>
    </table>
  </div>
</div>
`;

export default function VariantsExample() {
    return (
        <div>
            <h5 className="text-secondary mb-2">Bordered Table</h5>
            <Table bordered className="mb-4">
                <TableHead>
                    <TableRow>
                        <TableCell isHeader>#</TableCell>
                        <TableCell isHeader>First Name</TableCell>
                        <TableCell isHeader>Last Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Mark</TableCell>
                        <TableCell>Otto</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Jacob</TableCell>
                        <TableCell>Thornton</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <h5 className="text-secondary mb-2">Borderless Table</h5>
            <Table borderless className="mb-4">
                <TableHead>
                    <TableRow>
                        <TableCell isHeader>#</TableCell>
                        <TableCell isHeader>First Name</TableCell>
                        <TableCell isHeader>Last Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Mark</TableCell>
                        <TableCell>Otto</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Jacob</TableCell>
                        <TableCell>Thornton</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <h5 className="text-secondary mb-2">Small Table</h5>
            <Table size="sm" bordered striped>
                <TableHead>
                    <TableRow>
                        <TableCell isHeader>#</TableCell>
                        <TableCell isHeader>First Name</TableCell>
                        <TableCell isHeader>Last Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Mark</TableCell>
                        <TableCell>Otto</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Jacob</TableCell>
                        <TableCell>Thornton</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
