<template>
  <span>
    {{ numberFormat }}
  </span>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, watch } from 'vue';
import gsap from 'gsap';
export default defineComponent({
  name: 'CountTo',
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      default: 100
    },
    duration: {
      type: Number,
      default: 1000
    },
    decimals: {
      type: Number,
      default: 2
    },
    separator: {
      type: String,
      default: ','
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const count = reactive({ number: props.startVal });
    let aaa: gsap.core.Tween | undefined;
    const start = () => {
      if (props.startVal === props.endVal) return;
      count.number = props.startVal;
      aaa = gsap.to(count, {
        duration: props.duration / 1000,
        number: props.endVal
      });
    };
    watch(
      () => props.endVal,
      () => {
        aaa?.kill();
        start();
      }
    );
    onMounted(() => {
      console.log('start()');
      start();
    });
    const countFormat = (num: number): string => {
      const numToStr = num.toFixed(props.decimals < 0 ? 0 : props.decimals);
      if (num < 1000) return props.prefix + numToStr + props.suffix;
      const [intStr, decStr = ''] = numToStr.split('.');
      const intStrLength = intStr.length;
      const intStrArr = intStr.split('');
      const part = Math.floor(intStrLength / 3);
      const remainder = intStrLength % 3;
      const arr = [];
      arr.push(...intStrArr.splice(0, remainder));
      for (let index = 0; index < part; index++) {
        if (arr.length === 0) {
          arr.push(...intStrArr.splice(0, 3));
        } else {
          arr.push(props.separator, ...intStrArr.splice(0, 3));
        }
      }
      const number = arr.join('') + (decStr === '' ? '' : '.' + decStr);
      return props.prefix + number + props.suffix;
    };
    const numberFormat = ref(
      String(props.startVal.toFixed(props.decimals < 0 ? 0 : props.decimals))
    );

    watch(
      () => count.number,
      newV => {
        numberFormat.value = countFormat(newV);
      }
    );
    return {
      count,
      start,
      numberFormat
    };
  }
});
</script>
