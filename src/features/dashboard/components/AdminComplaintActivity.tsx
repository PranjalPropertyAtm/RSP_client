import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ROUTES } from '@/constants/routes';
import { tableTypography } from '@/lib/typography';
import { cn, formatDate, formatDateTime } from '@/lib/utils';
import type { RecentComplaintActivity, UserComplaintStat } from '@/features/dashboard/api/dashboard.api';

interface AdminComplaintActivityProps {
  userStats: UserComplaintStat[];
  recentComplaints: RecentComplaintActivity[];
}

export function AdminComplaintActivity({ userStats, recentComplaints }: AdminComplaintActivityProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-rsp-navy">Complaints by Employee</CardTitle>
          <CardDescription>How many complaints each user has filed and when</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-border/80">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead>Employee</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>First Filed</TableHead>
                  <TableHead>Last Filed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userStats.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={4} className="h-24 text-center text-xs text-muted-foreground">
                      No employees found.
                    </TableCell>
                  </TableRow>
                ) : (
                  userStats.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-rsp-navy">{user.fullName}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                          <StatusBadge variant={user.isActive ? 'success' : 'danger'}>
                            {user.isActive ? 'active' : 'inactive'}
                          </StatusBadge>
                        </div>
                      </TableCell>
                      <TableCell className={cn('text-right', tableTypography.cellNumeric)}>
                        {user.totalComplaints}
                      </TableCell>
                      <TableCell className={tableTypography.cellNumeric}>
                        {user.firstComplaintAt ? formatDate(user.firstComplaintAt) : '—'}
                      </TableCell>
                      <TableCell className={tableTypography.cellNumeric}>
                        {user.lastComplaintAt ? formatDateTime(user.lastComplaintAt) : '—'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-rsp-navy">Recent Complaint Activity</CardTitle>
          <CardDescription>Latest complaints filed and who entered them</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-border/80">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead>Case ID</TableHead>
                  <TableHead>Filed By</TableHead>
                  <TableHead>Complainant</TableHead>
                  <TableHead>When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentComplaints.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={4} className="h-24 text-center text-xs text-muted-foreground">
                      No complaints filed yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentComplaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell>
                        <Link
                          to={ROUTES.COMPLAINTS.DETAILS(complaint.id)}
                          className={cn(tableTypography.cellLink, 'font-mono')}
                        >
                          {complaint.caseId}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="font-medium">{complaint.filedBy.fullName}</p>
                          <p className="text-xs text-muted-foreground">{complaint.filedBy.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{complaint.complainantName}</TableCell>
                      <TableCell className={tableTypography.cellNumeric}>
                        {formatDateTime(complaint.submittedDate)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
