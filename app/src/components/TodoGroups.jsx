import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TodoGroups = ({ todoGroups }) => {
  const todoGroupsElement = todoGroups.map((todoGroup) => (
    <div key={todoGroup._id}>
      <Card sx={{ minWidth: 275, margin: "10px" }}>
        <CardContent>
          <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
            {todoGroup.title}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Link to={`/todos/${todoGroup._id}`}>View Group</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  ));

  return <>{todoGroupsElement}</>;
};

export default TodoGroups;
