import Skeleton from '@material-ui/lab/Skeleton';

const style = {
    padding: 20,
    marginBottom: 20,
};

const SkeletonBlog = () => (
    <>
        <div className="row">
            <div className="col-sm-2 hidden-mobile">
                <Skeleton animation="wave" variant="text" width="95%" height={30} />
                <Skeleton animation="wave" variant="text" width="80%" height={20} />
                <Skeleton animation="wave" variant="text" width="80%" height={20} />
                <Skeleton animation="wave" variant="text" width="80%" height={20} />
            </div>
            <div className="col-sm-10 col-xs-12">
                <div style={style}>
                    <Skeleton animation="wave" variant="text" width="100%" height={30} />
                    <Skeleton animation="wave" variant="text" width="70%" height={20} />
                    <Skeleton animation="wave" variant="rect" width="100%" height={320} />
                    <Skeleton animation="wave" variant="text" width="95%" height={20} />
                    <Skeleton animation="wave" variant="text" width="80%" height={20} />
                    <Skeleton animation="wave" variant="rect" width="35%" height={50} />
                </div>
                <div style={style}>
                    <Skeleton animation="wave" variant="text" width="100%" height={30} />
                    <Skeleton animation="wave" variant="text" width="70%" height={20} />
                    <Skeleton animation="wave" variant="rect" width="100%" height={320} />
                    <Skeleton animation="wave" variant="text" width="95%" height={20} />
                    <Skeleton animation="wave" variant="text" width="80%" height={20} />
                    <Skeleton animation="wave" variant="rect" width="35%" height={50} />
                </div>
                <div style={style}>
                    <Skeleton animation="wave" variant="text" width="100%" height={30} />
                    <Skeleton animation="wave" variant="text" width="70%" height={20} />
                    <Skeleton animation="wave" variant="rect" width="100%" height={320} />
                    <Skeleton animation="wave" variant="text" width="95%" height={20} />
                    <Skeleton animation="wave" variant="text" width="80%" height={20} />
                    <Skeleton animation="wave" variant="rect" width="35%" height={50} />
                </div>
            </div>
        </div>
    </>
);

export default SkeletonBlog;
