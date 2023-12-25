import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ButtonGroup } from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";

const Todo = ({ todo = {}, toggleUrgent, toggleCompleted }) => {
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
        key={todo._id}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {formatDate(new Date(todo.date))}{" "}
            {todo.urgent && <NotificationImportantIcon />}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              textDecoration: todo.completed ? "line-through" : null,
              color: todo.completed ? "grey" : null,
              transition: "0.25s",
            }}
          >
            <Link to={`/todos/${todo.todoGroup}/${todo._id}`}>{todo.title}</Link>
          </Typography>
          {todo.deadline && (
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <AlarmIcon /> {formatDate(new Date(todo.deadline))}
            </Typography>
          )}
          <Typography variant="body2">{todo.content}</Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={toggleCompleted}>Check</Button>
            <Button onClick={toggleUrgent}>Urgent</Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </>
  );
};

export default Todo;
