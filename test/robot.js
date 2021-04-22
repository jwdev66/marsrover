const chai = require('chai');
const expect = require('chai').expect;
const MissionControl = require('../src/missionControl.js');
const Robot = require('../src/robot.js');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

describe('Robot', () => {
  const missionControl = new MissionControl();
  const robot = new Robot();

  describe('Intantiation', () => {
    it('should return an instance', () => {
      expect(robot).to.be.an.instanceof(Robot);
    });
  });

  describe('Constructor', () => {
    it('should have an previous position', () => {
      expect(robot.data.previousPosition).to.include({
        x: 0,
        y: 0,
        orientation: 'n',
      });
    });

    it('should have an final position', () => {
      expect(robot.data.finalPosition).to.include({
        x: 0,
        y: 0,
        orientation: 'n',
      });
    });

    it('should have an array of instructions', () => {
      expect(robot.data.instructions).to.be.array();
    });
  });

  describe('Previous position', () => {
    it('should SET a previous position', () => {
      missionControl.coordinates = '5 3';
      missionControl.robotPosition = '2 2 E';
      robot.previousPosition = missionControl.robotPosition;
      expect(robot.data.previousPosition).to.include({
        x: 2,
        y: 2,
        orientation: 'e',
      });
    });

    it('should GET a previous position', () => {
      missionControl.coordinates = '5 3';
      missionControl.robotPosition = '2 2 E';
      robot.previousPosition = missionControl.robotPosition;
      expect(robot.previousPosition).to.include({
        x: 2,
        y: 2,
        orientation: 'e',
      });
    });
  });

  describe('Final position', () => {
    it('should SET a final position', () => {
      missionControl.coordinates = '5 3';
      missionControl.robotPosition = '2 2 E';
      robot.finalPosition = missionControl.robotPosition;
      expect(robot.data.finalPosition).to.include({
        x: 2,
        y: 2,
        orientation: 'e',
      });
    });

    it('should GET a final position', () => {
      missionControl.coordinates = '5 3';
      missionControl.robotPosition = '2 2 E';
      robot.finalPosition = missionControl.robotPosition;
      expect(robot.finalPosition).to.include({ x: 2, y: 2, orientation: 'e' });
    });
  });

  describe('instructions', () => {
    it('should SET instructions', () => {
      missionControl.robotDirection = 'RMRMRMRM';
      robot.instructions = missionControl.robotDirection;
      expect(robot.data.instructions).to.be.equalTo([
        'r',
        'm',
        'r',
        'm',
        'r',
        'm',
        'r',
        'm',
      ]);
    });

    it('should GET instructions', () => {
      missionControl.robotDirection = 'RMRMRMRM';
      robot.instructions = missionControl.robotDirection;
      expect(robot.instructions).to.be.equalTo([
        'r',
        'm',
        'r',
        'm',
        'r',
        'm',
        'r',
        'm',
      ]);
    });
  });

  describe('World enviroment', () => {
    it('should SET enviroment data', () => {
      const missionOne = new MissionControl();
      const robotOne = new Robot();
      missionOne.coordinates = '5 3';
      missionOne.robotDirection = 'RMRMRMRM';
      missionOne.robotPosition = '1 1 E';
      robotOne.finalPosition = missionOne.robotPosition;
      robotOne.instructions = missionOne.robotDirection;
      robotOne.worldDimensions = missionOne.coordinates;
      expect(robotOne.data.dimensions).to.include({ x: 5, y: 3 });
    });
  });
});
