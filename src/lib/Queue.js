// docker run --name redisbarber -p:6379:6379 -d -t redis:alpine necessário banco redis
// todos os trabalhos que ficam dentro de filas são chamados de jobs
import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    // uma fila para cada background job
    this.queues = {};
    this.init();
  }

  init() {
    // acesso a propriedades ou metodos de classe ex: ({key, handle})
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];
      bee.process(handle);
    });
  }
}

export default new Queue();
