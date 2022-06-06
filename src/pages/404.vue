<template>
  <br /><br />
  <br /><br />
  <br /><br />
  <br /><br />
  <br /><br />
  <el-result
    icon="warning"
    title="找不到页面"
    sub-title="点击下面按钮就行返回"
  >
    <template #extra>
      <el-button
        type="primary"
        @click="$router.push('/')"
      >
        返回
      </el-button>
    </template>
  </el-result>
</template>
