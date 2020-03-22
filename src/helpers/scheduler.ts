/* eslint-disable class-methods-use-this */
import cron from 'node-cron';
import { refreshToken } from '../auth/refresh_token';

/** schedule class  */
class Schedule {
  /**
   *  deletes message from database
   * @returns {void}
   */
  scheduleRefreshToken(pattern: string): void {
    cron.schedule(pattern, async () => {
      await refreshToken();
    });
  }

}
const schedule = new Schedule();
export default schedule;