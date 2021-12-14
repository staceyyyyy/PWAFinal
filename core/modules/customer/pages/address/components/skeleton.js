import Skeleton from '@material-ui/lab/Skeleton';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export const SkeletonTable = () => (
    // <Skeleton variant="rect" width="100%" height={118} />
    <>
        <TableRow>
            <TableCell colSpan={9}>
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton variant="text" width="100%" height={30} />
            </TableCell>
        </TableRow>
    </>
);

export const SkeletonMobile = () => {
    const SkeletonData = [1, 2, 3];
    return (
        <div style={{ padding: 20 }}>
            {
                SkeletonData.map((item) => (
                    <div style={{ marginBottom: 30 }} key={item}>
                        <Skeleton width="50%" variant="text" animation="wave" height={30} />
                        <Skeleton width="90%" variant="text" animation="wave" height={30} />
                        <Skeleton width="90%" variant="text" animation="wave" height={30} />
                        <Skeleton width="90%" variant="text" animation="wave" height={30} />
                    </div>
                ))
            }
        </div>
    );
};

export default {
    SkeletonTable,
    SkeletonMobile,
};
