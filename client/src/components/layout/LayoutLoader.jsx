import { Grid  , Skeleton , Stack } from "@mui/material";

const LayoutLoader = () => {
  return (
    
    <Grid container height={`calc(100vh - 4rem)`}>
          <Grid
            item
            sm={4}
            md={3}
            height={"100%"}
            width={"30%"}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Skeleton variant="rounded" height={"100%"} />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} width={"40%"}>
            <Stack spacing={"1rem"}>
                <Skeleton variant="rounded" height={"5rem"} />
                <Skeleton variant="rounded" height={"5rem"} />
                <Skeleton variant="rounded" height={"5rem"} />
                <Skeleton variant="rounded" height={"5rem"} />      
                <Skeleton variant="rounded" height={"5rem"} />
                <Skeleton variant="rounded" height={"5rem"} />
            </Stack>
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            width={"30%"}
          >
            <Skeleton variant="rounded" height={"100%"} />
          </Grid>
        </Grid>
    
  )
}

export default LayoutLoader;
