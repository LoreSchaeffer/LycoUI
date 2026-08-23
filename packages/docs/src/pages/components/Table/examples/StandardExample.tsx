import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Badge, Row, Col } from '@loreschaeffer/lyco-ui';

export const title = 'Data Table with Users';
export const description = <p>A clean, linear-style table optimized for readability. It uses <code>hover</code> by default to help users track rows, and removes vertical borders for a cleaner aesthetic.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="row">
  <div class="col-12">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Active</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 2rem; height: 2rem; border-radius: 50%; background: var(--color-surface-elevated); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold;">
                  JD
                </div>
                <div>
                  <div style="font-weight: 500;">John Doe</div>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted);">john@example.com</div>
                </div>
              </div>
            </td>
            <td>Admin</td>
            <td><span class="badge badge-success">Active</span></td>
            <td>Just now</td>
          </tr>
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 2rem; height: 2rem; border-radius: 50%; background: var(--color-surface-elevated); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold;">
                  AS
                </div>
                <div>
                  <div style="font-weight: 500;">Alice Smith</div>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted);">alice@example.com</div>
                </div>
              </div>
            </td>
            <td>Editor</td>
            <td><span class="badge badge-warning">Pending</span></td>
            <td>2 hours ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;

export default function StandardExample() {
    return (
        <Row>
            <Col span={12}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Last Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'var(--color-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                        JD
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500 }}>John Doe</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>john@example.com</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>
                                <Badge variant="success">Active</Badge>
                            </TableCell>
                            <TableCell>Just now</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'var(--color-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                        AS
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500 }}>Alice Smith</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>alice@example.com</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>Editor</TableCell>
                            <TableCell>
                                <Badge variant="warning">Pending</Badge>
                            </TableCell>
                            <TableCell>2 hours ago</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'var(--color-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                        RJ
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500 }}>Robert Jones</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>robert@example.com</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>Viewer</TableCell>
                            <TableCell>
                                <Badge variant="danger">Inactive</Badge>
                            </TableCell>
                            <TableCell>3 days ago</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Col>
        </Row>
    );
}
