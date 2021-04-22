const MissionControl = require("./src/missionControl.js");
const Robot = require("./src/robot.js");
const fs = require("fs");
const readline = require("readline-sync");

function main() {
  const input = readline.prompt();
  const inputs = input.split("<");
  if (inputs.length > 1) {
    const fileName = inputs[1].trim();
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) console.log(err);
      else {
        const dataArray = data.toString().trim().split("\n");
        const coordinates = dataArray[0].split(":")[1];
        let isEnd = false;
        let index = 1;
        let rober = "";
        const robot = new Robot();
        const mission = new MissionControl();

        while (!isEnd) {
          if (index > dataArray.length - 2) {
            isEnd = true;
          } else {
            mission.coordinates = coordinates;
            rober = dataArray[index].split(":")[0].split(" ")[0];
            mission.robotPosition = dataArray[index].split(":")[1];
            mission.robotDirection = dataArray[index + 1].split(":")[1];

            robot.finalPosition = mission.robotPosition;
            robot.instructions = mission.robotDirection;
            robot.worldDimensions = mission.coordinates;
            robot.lostContactCoordinates = mission.lostContactCoordinates;

            console.log(`${rober}:` + `${robot.move}`);
          }
          index = index + 2;
        }
      }
    });
  }
}

main();
