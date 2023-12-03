import { DataTypes } from 'sequelize';
import sequaleze  from '../database';

export const Note = sequaleze.define('Note', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date_created: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente',
    validate: {
      isIn: {
        args:[['pendiente','completada']],
        msg: "state must be pendiente o completada"
      }
    }
  },
  final_note: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isInt:{
        msg: "final_note must be Integer"
      }
    }
  },
});
