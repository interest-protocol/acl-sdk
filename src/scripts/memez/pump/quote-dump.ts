import { memezPumpTestnet, POW_9, TEST_POOL_ID } from '../../utils.script';

(async () => {
  const x = await memezPumpTestnet.quoteDump({
    pool: TEST_POOL_ID,
    amount: 1_500_000n * POW_9,
  });

  console.log(x);
})();
