import { debug } from 'debug';

export enum LOG_NAMESPACE {
  socket = 'socket',
  stats = 'stats',
  invitations = 'invitations',
}

export const createLogger = (name: string, namespace: LOG_NAMESPACE) =>
  debug(`CNB:${namespace}:${name}`);
