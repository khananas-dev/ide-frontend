import {
  Box,
  CircularProgress,
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material";

function Spinner(props: CircularProgressProps) {
  return (
    <Box
      sx={{
        position: "relative",
        marginRight: "8px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CircularProgress
        variant="determinate"
        sx={{
          //   color: (theme) => theme.palette.grey[200],
          color: "#e0e0e0",
        }}
        size={15}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => theme.palette.primary.main,
          animationDuration: "1s",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
            strokeDasharray: "40px,100px",
          },
        }}
        size={15}
        thickness={4}
        value={0}
        {...props}
      />
    </Box>
  );
}

export default Spinner;
