import React from "react";
import { Box, TextField, Typography, Stack, Button } from "@mui/material";
import { styled } from "@mui/system";

const ListStem = styled(Box)`
  margin-block: 10px;
`;
const ListContent = styled(Box)(({ theme }) => ({
  width: "100%",
  // maxWidth: 400,
  minHeight: 60,
  position: "relative",
}));
const TxtInput = styled(TextField)(({ theme, visible }) => ({
  position: "absolute",
  top: 0,
  width: "100%",
  zIndex: 0,
  textAlign: "center",
  // maxHeight: 60,
  opacity: visible === "true" ? 1 : 0,
  pointerEvents: visible === "true" ? "auto" : "none",
}));
const TitleTxt = styled(Typography)(({ theme }) => ({
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1.5),
  zIndex: 10,
  cursor: "pointer",
  borderRadius: 2,
  ["&:hover"]: {
    boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`,
  },
}));

const List = (props) => {
  const { item, resetList, reset, persistUpdate, lastItem, setInactive } =
    props;
  const [edit, setEdit] = React.useState(false);
  const [fieldVal, setFieldVal] = React.useState("loading...");
  const inp = React.useRef(null);
  const initialTitle = React.useRef("");

  const focusInp = () => {
    setEdit(true);
    // console.log("inp", inp);
    inp?.current?.focus();
  };
  const handleInpBlur = () => {
    setEdit(false);
    if (fieldVal === initialTitle.current) {
      setInactive(true);
    } else {
      setInactive(false);
    }
  };
  const handleInpKeyPress = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Escape" || event.key === "Enter")
    ) {
      setEdit(false);
      inp?.current?.blur();
    }
  };
  React.useEffect(() => {
    if (item?.title) {
      initialTitle.current = item?.title;
      setFieldVal(item?.title);
    }
  }, [item]);
  React.useEffect(() => {
    if (resetList) {
      setFieldVal(initialTitle.current);
    }
    if (resetList && lastItem) {
      reset(false);
    }
  }, [resetList]);
  React.useEffect(() => {
    if (persistUpdate) {
      initialTitle.current = fieldVal;
    }
  }, [persistUpdate]);

  return (
    <ListStem className="list">
      <Stack sx={{ mb: 1 }}>
        <span style={{ margin: "auto" }}>
          {new Date(Date.now()).toString()}
        </span>
      </Stack>
      <ListContent>
        <TxtInput
          inputRef={inp}
          value={fieldVal}
          inputProps={{ spellCheck: "false" }}
          onChange={(e) => {
            setFieldVal(e.target.value);
          }}
          onBlur={handleInpBlur}
          onKeyDown={handleInpKeyPress}
          visible={edit.toString()}
        />
        {!edit && (
          <Stack>
            <TitleTxt variant="body1" onClick={focusInp}>
              {fieldVal}
            </TitleTxt>
          </Stack>
        )}
      </ListContent>
      <Stack>
        <img src={item?.thumbnailUrl} width={100} style={{ margin: "auto" }} />
      </Stack>
    </ListStem>
  );
};

export default React.memo(List);
