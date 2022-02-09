import React from "react";
import {
  CssBaseline,
  Container,
  CircularProgress,
  Box,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";

import List from "./components/List";
import { getList } from "./redux/actions/index";

const ContentCont = styled(Container)`
  > div.list:nth-of-type(even) {
    background-color: #f4f4f4;
  }
`;
const ListToolbar = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-block: 20px;
  padding-inline: 10px;
`;

const App = () => {
  const theme = createTheme();
  const dispatch = useDispatch();
  const { list, loading, err } = useSelector((state) => state.lists);
  const [resetList, setResetList] = React.useState(false);
  const [persistUpdate, setPersistUpdate] = React.useState(false);
  const [inactive, setInactive] = React.useState(true);

  const handleInactive = React.useCallback((status) => {
    setInactive(Boolean(status));
  }, []);

  const handleResetList = React.useCallback((status) => {
    setResetList(Boolean(status));
  }, []);
  const handlePersistUpdate = React.useCallback((status) => {
    setPersistUpdate(Boolean(status));
  }, []);
  React.useEffect(() => {
    dispatch(getList());
  }, []);
  // React.useEffect(() => {
  //   if(resetList) {
  //     handleResetList(false);
  //   }
  // }, [resetList]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContentCont maxWidth="md">
        {!loading ? (
          <>
            <ListToolbar>
              <Button
                variant="outlined"
                size="small"
                color="warning"
                onClick={() => handleResetList(true)}
              >
                reset
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handlePersistUpdate(true)}
                disabled={inactive}
              >
                confirm update
              </Button>
            </ListToolbar>
            {/* if((index % Math.ceil(list?length / numOfLists)) == 0) */}
            {list?.map((item, i, listArr) => {
              return (
                <List
                  key={i}
                  item={item}
                  resetList={resetList}
                  reset={handleResetList}
                  persistUpdate={persistUpdate}
                  update={handlePersistUpdate}
                  setInactive={handleInactive}
                  lastItem={listArr.length - 1 === i}
                />
              );
            })}
          </>
        ) : (
          <Stack sx={{ mt: 3 }}>
            <Box component="span" sx={{ m: "auto" }}>
              <CircularProgress />
            </Box>
          </Stack>
        )}
        {err && (
          <Stack sx={{ mt: 3 }}>
            <Box component="span" sx={{ m: "auto" }}>
              <Typography>{err}</Typography>
            </Box>
          </Stack>
        )}
      </ContentCont>
    </ThemeProvider>
  );
};

export default App;
